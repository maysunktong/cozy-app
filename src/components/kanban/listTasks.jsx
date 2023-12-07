import { useEffect, useState } from "react";
import  toast  from "react-hot-toast";

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
    <div className='flex gap-4 w-screen'>
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
  return (
    <div className='w-screen'>
      <h2 className={`flex items-center w-full ${statusColor[status]}`}>{status}</h2>
      <div className='text-xl'>
        {tasksByStatus.length}
      </div>
      <div className='flex flex-col gap-4'>
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
  const [editedTitle, setEditedTitle] = useState(task);
  const [editedDescription, setEditedDescription] = useState(task);
  const [removed, setRemoved] = useState(false);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  }

  const handleSaveTitle = () => {
    const newTasks = tasks.map(t => t.id === task.id ? editedTitle : t);
    setTasks(newTasks);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    const newTasks = tasks.map(t => t.id === task.id ? editedDescription : t);
    setTasks(newTasks);
    setIsEditingDescription(false);
  }

  const handleRemove = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setRemoved(true);
  }

  return (
    <div>
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
};
