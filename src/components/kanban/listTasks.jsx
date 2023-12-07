import { useEffect, useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import toast from "react-hot-toast";

export const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [review, setReview] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const filterTodos = tasks.filter((task) => task.status === "todo");
    const filterInProgress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const filterReview = tasks.filter((task) => task.status === "review");
    const filterDone = tasks.filter((task) => task.status === "done");

    setTodos(filterTodos);
    setInProgress(filterInProgress);
    setReview(filterReview);
    setDone(filterDone);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "review", "done"];

  return (
    <div className='flex gap-4 w-full'>
      {statuses.map((status, index) => {
        return <Section key={index} status={status} tasks={tasks} setTasks={setTasks} 
        todos={todos} inProgress={inProgress} review={review} done={done} />;
      })}
    </div>
  );
};

// component Section for each single status
const Section = ({ status, tasks, setTasks, todos, inProgress, review, done }) => {

  const statusColor = { todo: 'bg-blue-500', inprogress: 'bg-yellow-500', review: 'bg-orange-500', done: 'bg-green-500' };
  let tasksByStatus;
  switch (status) {
    case 'todo':
      tasksByStatus = todos;
      break;
    case 'inprogress':
      tasksByStatus = inProgress;
      break;
    case 'review':
      tasksByStatus = review;
      break;
    case 'done':
      tasksByStatus = done;
      break;
    default:
      tasksByStatus = [];
  }

  const [{isOver}, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item) => addItemToSection(item.id),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id) => {
    setTasks((prev) => {
      const modifiedTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      })
      return modifiedTasks;
  });
  }


  return (
    <div ref={drop} className='w-full flex flex-col justify-center items-start'>
      <div className='flex justify-start items-center'>
        <h2 className={`w-[16rem] px-2 py-1 text-lg font-semibold ${statusColor[status]} text-white`}>
          {status}
        
        </h2>
        <span className="text-sm">{tasksByStatus.length}</span>
      </div>
      <div className='flex flex-col gap-4 mt-4'>
      {tasksByStatus.map((task) => ( 
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
      </div>
    </div>
  );
};


// component Task for each single task
const Task = ({ task, tasks, setTasks }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [removed, setRemoved] = useState(false);

  // drag and drop
  const [{isDragging}, drag] = useDrag(() => ({
    type: 'task',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log("isDragging",isDragging);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  }

  const handleSaveTitle = () => {
    const newTasks = tasks.map(t => t.id === task.id ? {...t, title: editedTitle} : t);
    setTasks(newTasks);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    const newTasks = tasks.map(t => t.id === task.id ? {...t, description: editedDescription} : t);
    setTasks(newTasks);
    setIsEditingDescription(false);
  }

  const handleRemove = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setRemoved(true);
    toast.success("Task removed");
  }

  return (
    <div className='cursor-grab' ref={drag}>
      {isEditingTitle ? (
        <input
          type="text"
          value={editedTitle.title}
          onChange={(e) => setEditedTitle({ ...editedTitle, title: e.target.value })}
        />
      ) : (
        <p>{task.title}</p>
      )}
      {isEditingTitle ? (
        <button onClick={handleSaveTitle}>Save</button>
      ) : (
        <button onClick={handleEditTitle}>Edit</button>
      )}
      
      {isEditingDescription ? (
        <input
          type="text"
          value={editedDescription.description}
          onChange={(e) => setEditedDescription({ ...editedDescription, description: e.target.value })}
        />
      ) : (
        <p>{task.description}</p>
      )}
      {isEditingDescription ? (
        <button onClick={handleSaveDescription}>Save</button>
      ) : (
        <button onClick={handleEditDescription}>Edit</button>
      )}
      
      <button onClick={() => handleRemove(task.id)}>Remove</button>
    </div>
  );
}
