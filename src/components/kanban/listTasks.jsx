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
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newTasks = tasks.map(t => t.id === task.id ? editedTask : t);
    setTasks(newTasks);
    setIsEditing(false);
  };

  const handleRemove = (taskId) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
    toast.success('Task deleted');
  };

  return (
    <div>
      <button onClick={() => handleRemove(task.id)}>Delete</button>
      {isEditing ? (
        <input
          type="text"
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        />
      ) : (
        <p>{task.description}</p>
      )}
      {isEditing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={handleEdit}>Edit</button>
      )}
      
    </div>
  );
};
