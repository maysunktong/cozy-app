import { useState } from 'react';
import { CreateTask } from './kanban/createTask';
import { ListTasks } from './kanban/listTasks';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Kanban = () => {
  const [tasks, setTasks] = useState([]);

  console.log("Tasks",tasks);

useEffect(() => {
  setTasks(JSON.parse(localStorage.getItem('tasks')) || []);
}
,[]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <p className="w-full text-2xl text-center font-bold pb-4 dark:text-gray-200">Kanban Board 📚</p>
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks}  />
    </DndProvider>
  )
}
