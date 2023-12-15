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
    <div className="w-full lg:px-24  flex flex-col justify-center items-center gap-2  md:flex-col md:items-start dark:text-white">
      <form
        onSubmit={HandleSubmit}
        className="w-full flex-col lg:flex-row flex justify-center items-center gap-4 "
      >
        <div className="w-full flex justify-center items-start gap-4 flex-col">
          <label htmlFor="title" className='text-md lg:text-lg text-gray-500'>Title</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="Task name"
            className="border border-gray-400 shadow-md rounded-2xl text-black p-2 dark:text-slate-800 w-full"
          />
        </div>
        <div className="w-full flex gap-4 justify-center items-start flex-col">
          <label htmlFor="description" className='text-md lg:text-lg text-gray-500'>Description</label>
          <input
            type="text"
            id="description"
            value={task.description}
            onChange={(e) =>
              setTask((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Task description"
            className="border border-gray-400 shadow-md text-black rounded-2xl p-2 w-full"
          />
        </div>
          
      </form>
      <div className='w-full flex justify-end items-center'>
        <button
              type="submit"
              className="border-gray-400 rounded-3xl py-2 px-4 bg-green-300 hover:bg-blue-400 font-bold shadow-md w-fit text-black"
            >
              Create
            </button>
      </div>
    </div>
  );
};
