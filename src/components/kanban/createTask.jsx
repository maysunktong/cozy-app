import { useState } from "react";
import { toast } from "react-hot-toast";

export const CreateTask = ({ tasks, setTasks }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    status: "todo",
  });

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) {
      return toast.error("Task name is required");
    }

    if (!task.description) {
      return toast.error("Task description is required");
    }

    setTasks((prev) => {
      const TaskWithIdAndDate = {
        ...task,
        id: Date.now(),
        createDate: new Date().toLocaleString(),
      };
      const List = [...prev, TaskWithIdAndDate];
      localStorage.setItem("tasks", JSON.stringify(List));
      toast.success("Task successfully created 🎉");
      setTask({ title: "", description: "", status: "todo" }); // Clear the task field
      return List;
    });
  };

  return (
    <div className="flex justify-center items-center gap-2 h-12 py-12 md:flex-col md:items-start">
      <form
        onSubmit={HandleSubmit}
        className="flex justify-start items-center gap-4 md:flex-col md:items-start"
      >
        <div className="flex justify-start items-center gap-4 md:flex-col md:items-start">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task name"
            className="border border-gray-400 rounded-2xl text-black p-2 dark:text-slate-800 w-full"
          />
        </div>
        <div className="flex gap-4 justify-start items-center md:flex-col md:items-start">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Task description"
            className="border border-gray-400 text-black rounded-2xl p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="border-gray-400 rounded-3xl py-2 px-4 bg-green-300 hover:bg-green-200 font-bold shadow-md w-full md:mt-4"
        >
          Create
        </button>
      </form>
    </div>
  );
};
