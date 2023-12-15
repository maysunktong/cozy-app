// src/components/TodoList.js
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, markAsDone } from "../reducers/todoSlice";
import { IconContext } from "react-icons";
import { MdOutlineDone } from "react-icons/md";

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

  return (
    <div className='w-full'>
      <div className='w-full'>
      <p className="w-full text-2xl text-center font-bold pb-4 dark:text-gray-200">Todo Board ⛳️</p>
        <div className="w-full flex gap-4 justify-start items-center">
          <input
            type="text"
            value={taskInput}
            placeholder="Enter task name"
            onChange={(e) => setTaskInput(e.target.value)}
            className="border border-gray-400 rounded-2xl p-2 w-80 dark:text-black"
          />
          <button
            onClick={HandleAddTask}
            className="border-gray-400 rounded-3xl py-2 px-4 bg-yellow-500 hover:bg-yellow-600 font-bold shadow-md"
          >
            Add Task
          </button>
        </div>
        <div className='flex flex-row w-full py-8 gap-8'>
          <div className='w-96'>
            <div className='border shadow-md bg-yellow-300 p-2 rounded-2xl font-bold'>Task tray</div>
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
          </div>
          <div className='w-96'>
            <div className='border shadow-md bg-green-400 p-2 rounded-2xl font-bold'>Done</div>
            <ul className='flex flex-wrap flex-col py-4 gap-4'>
              {done.map((doneTask) => (
                <li key={doneTask.id} className='border p-4 rounded-xl shadow-md bg-green-200 line-through'>{doneTask.text}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
