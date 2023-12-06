import { useState } from 'react';
import { CreateTask } from './kanban/createTask';
import { ListTasks } from './kanban/listTasks';
import { useEffect } from 'react';
import {Toaster} from 'react-hot-toast';

export const Kanban = () => {
  const [tasks, setTasks] = useState([]);

  console.log("Tasks",tasks);

useEffect(() => {
  setTasks(JSON.parse(localStorage.getItem('tasks')) || []);
}
,[]);

  return (
    <div>
      <Toaster />
      <CreateTask tasks={tasks} setTasks={setTasks} />
      <ListTasks tasks={tasks} setTasks={setTasks}  />
    </div>
  )
}
