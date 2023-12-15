// src/components/TodoList.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, markAsDone, deleteDoneTask } from "../reducers/todoSlice";
import { IconContext } from "react-icons";
import { MdOutlineDone, MdDelete } from "react-icons/md";

export const Todolist = () => {
  const [taskInput, setTaskInput] = useState("");
  const Dispatch = useDispatch();
  const { tasks, done } = useSelector((state) => state.todo);

  const HandleAddTask = () => {
    if (taskInput.trim() !== "") {
      Dispatch(addTask({ id: Date.now(), text: taskInput }));
      setTaskInput("");
    }
  };

  const HandleMarkAsDone = (taskId) => {
    Dispatch(markAsDone({ taskId }));
  };

  const HandleDeleteDoneTask = (taskId) => {
    Dispatch(deleteDoneTask({ taskId }));
  };

  return (
    <div className='w-full'>
      <div className='w-full'>
      <p className="w-full text-2xl text-center font-bold pb-4 dark:text-gray-200">Todo Board ⛳️</p>
        <div className="w-full flex justify-center items-center gap-4">
          <input
            type="text"
            value={taskInput}
            placeholder="Enter task name"
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-full lg:w-[24rem] md:w-[48] border border-gray-400 rounded-2xl p-2 dark:text-black shadow-md"
          />
          <button
            onClick={HandleAddTask}
            className="border-gray-400 rounded-3xl py-2 px-4 bg-yellow-500 hover:bg-yellow-600 font-bold shadow-md w-fit"
          >
            Add
          </button>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 py-8 gap-8'>
          <div className='w-full'>
            <div className='border shadow-md bg-yellow-300 p-2 rounded-2xl font-bold'>Task tray</div>
            {tasks.length > 0 ? (
              <ul className='flex flex-wrap flex-col py-4 gap-4'>
                {tasks.map((task) => (
                  <li key={task.id} className='border p-4 rounded-xl shadow-md bg-white flex justify-between items-center dark:text-slate-800'>
                    <div>{task.text}</div>
                    <button onClick={() => HandleMarkAsDone(task.id)}>
                    <IconContext.Provider
                      value={{ color: "green", className: "global-class-name" }}
                    >
                      <MdOutlineDone size={24} />
                    </IconContext.Provider>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full min-h-[5rem] flex justify-center items-center text-gray-500">
                Tray is empty.
              </div>
            )}
          </div>
          <div className='w-full'>
            <div className='border shadow-md bg-green-400 p-2 rounded-2xl font-bold'>Done</div>
            {done.length > 0 ? (
              <ul className='flex flex-wrap flex-col py-4 gap-4'>
                {done.map((doneTask) => (
                  <li key={doneTask.id} className='border p-4 rounded-xl shadow-md bg-green-200 line-through flex justify-between items-center'>
                    <div>{doneTask.text}</div>
                    <button onClick={() => HandleDeleteDoneTask(doneTask.id)}>
                    <IconContext.Provider
                      value={{ color: "gray", className: "global-class-name" }}
                    >
                      <MdDelete size={24} />
                    </IconContext.Provider>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full min-h-[5rem]  flex justify-center items-center text-gray-500">
                No task is done.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
