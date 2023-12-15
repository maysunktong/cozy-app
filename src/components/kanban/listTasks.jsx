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
    const FilterTodos = tasks.filter((task) => task.status === "todo");
    const FilterInProgress = tasks.filter(
      (task) => task.status === "inprogress"
    );
    const FilterReview = tasks.filter((task) => task.status === "review");
    const FilterDone = tasks.filter((task) => task.status === "done");

    setTodos(FilterTodos);
    setInProgress(FilterInProgress);
    setReview(FilterReview);
    setDone(FilterDone);
  }, [tasks]);

  const Statuses = ["todo", "inprogress", "review", "done"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 py-4">
      {Statuses.map((status, index) => {
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
  const StatusColor = {
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
    drop: (item) => AddItemToSection(item.id),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const AddItemToSection = (id) => {
    setTasks((prev) => {
      const ModifiedTasks = prev.map((task) => {
        if (task.id === id) {
          return { ...task, status: status };
        }
        return task;
      });
      return ModifiedTasks;
    });
  };

  return (
    <div ref={drop} className="w-full px-2">
      <div
        className={`w-full flex justify-between items-center gap-2 px-2 py-1 text-lg font-semibold  ${StatusColor[status]} text-white rounded-xl`}
      >
        {status}
        <span className="text-sm text-white border rounded-full px-4">{tasksByStatus.length}</span>
      
      </div>
      <div className="w-full flex  flex-col py-4 gap-4 min-h-[10rem] lg:h-auto">
        {tasksByStatus.length > 0 ? (
          tasksByStatus.map((task) => (
            <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
          ))
        ) : (
          <div className="flex justify-center items-center text-gray-500">
            No tasks in this section.
          </div>
        )}
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

  const HandleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const HandleEditDescription = () => {
    setIsEditingDescription(true);
  };

  const HandleSaveTitle = () => {
    const NewTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, title: editedTitle } : t
    );
    setTasks(NewTasks);
    setIsEditingTitle(false);
  };

  const HandleSaveDescription = () => {
    const NewTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, description: editedDescription } : t
    );
    setTasks(NewTasks);
    setIsEditingDescription(false);
  };

  const HandleRemove = (id) => {
    const NewTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(NewTasks));
    setTasks(NewTasks);
    setRemoved(true);
    toast.success("Task removed");
  };

  return (
    <div
      className="cursor-grab border p-4 rounded-xl shadow-md bg-white"
      ref={drag}
    >
      <div className="flex justify-end items-center">
        <button onClick={() => HandleRemove(task.id)}>
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
            className="w-full outline-blue-300 text-blue-500"
          />
        ) : (
          <p className="font-bold dark:text-slate-600">{task.title}</p>
        )}
        {isEditingTitle ? (
          <button onClick={HandleSaveTitle}>Save</button>
        ) : (
          <button onClick={HandleEditTitle}>
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
            className="w-full outline-blue-300 text-blue-500"
          />
        ) : (
          <p className="text-gray-500">{task.description}</p>
        )}
        {isEditingDescription ? (
          <button onClick={HandleSaveDescription}>Save</button>
        ) : (
          <button onClick={HandleEditDescription}>
            <IconContext.Provider
              value={{ color: "lightgray", className: "global-class-name" }}
            >
              <RiEditLine />
            </IconContext.Provider>
          </button>
        )}
      </div>
      <span className="dark:text-gray-300 text-gray-300">
        Created:{" "}
        {new Date(task.createDate).toLocaleString("en-US", {
          dateStyle: "short",
          timeStyle: "short",
        })}
      </span>
    </div>
  );
};
