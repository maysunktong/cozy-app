import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";
import { IconContext } from "react-icons";
import { IoMdCloseCircle } from "react-icons/io";
import { RiEditLine } from "react-icons/ri";

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
    <div className="flex flex-col md:flex-row flex-wrap gap-6">
      {statuses.map((status, index) => {
        return (
          <Section
            key={index}
            status={status}
            tasks={tasks}
            setTasks={setTasks}
            todos={todos}
            inProgress={inProgress}
            review={review}
            done={done}
          />
        );
      })}
    </div>
  );
};

// component Section for each single status
const Section = ({
  status,
  tasks,
  setTasks,
  todos,
  inProgress,
  review,
  done,
}) => {
  const statusColor = {
    todo: "bg-blue-500",
    inprogress: "bg-yellow-500",
    review: "bg-orange-500",
    done: "bg-green-500",
  };
  let tasksByStatus;
  switch (status) {
    case "todo":
      tasksByStatus = todos;
      break;
    case "inprogress":
      tasksByStatus = inProgress;
      break;
    case "review":
      tasksByStatus = review;
      break;
    case "done":
      tasksByStatus = done;
      break;
    default:
      tasksByStatus = [];
  }

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
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
      });
      return modifiedTasks;
    });
  };

  return (
    <div ref={drop} className="flex flex-col flex-wrap w-full md:w-1/4">
      <div className="flex">
        <h2
          className={`min-w-[20rem] px-2 py-1 text-lg font-semibold ${statusColor[status]} text-white flex gap-4 justify-start items-center rounded-xl`}
        >
          {status}
          <span className="text-sm text-white">{tasksByStatus.length}</span>
        </h2>
      </div>
      <div className="flex flex-col py-4 gap-2">
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
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  console.log("isDragging", isDragging);

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const handleSaveTitle = () => {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, title: editedTitle } : t
    );
    setTasks(newTasks);
    setIsEditingTitle(false);
  };

  const handleSaveDescription = () => {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, description: editedDescription } : t
    );
    setTasks(newTasks);
    setIsEditingDescription(false);
  };

  const handleRemove = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setRemoved(true);
    toast.success("Task removed");
  };

  return (
    <div
      className="cursor-grab border p-2 rounded-xl shadow-md bg-white"
      ref={drag}
    >
      <div className="flex justify-end items-center">
        <button onClick={() => handleRemove(task.id)}>
          <IconContext.Provider
            value={{
              color: "gray",
              className: "global-class-name",
              size: "1.2em",
            }}
          >
            <IoMdCloseCircle />
          </IconContext.Provider>
        </button>
      </div>
      <div className="flex justify-between items-center">
        {isEditingTitle ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
        ) : (
          <p className="font-bold dark:text-slate-600">{task.title}</p>
        )}
        {isEditingTitle ? (
          <button onClick={handleSaveTitle}>Save</button>
        ) : (
          <button onClick={handleEditTitle}>
            <IconContext.Provider
              value={{ color: "lightgray", className: "global-class-name" }}
            >
              <RiEditLine />
            </IconContext.Provider>
          </button>
        )}
      </div>

      <div className="flex justify-between items-center">
        {isEditingDescription ? (
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
        ) : (
          <p className="text-gray-500">{task.description}</p>
        )}
        {isEditingDescription ? (
          <button onClick={handleSaveDescription}>Save</button>
        ) : (
          <button onClick={handleEditDescription}>
            <IconContext.Provider
              value={{ color: "lightgray", className: "global-class-name" }}
            >
              <RiEditLine />
            </IconContext.Provider>
          </button>
        )}
      </div>
      <span className='dark:text-gray-300 text-gray-300'>Created: {new Date(task.createDate).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}</span>

    </div>
  );
};
