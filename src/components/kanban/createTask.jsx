import { useState } from 'react';
import { toast } from 'react-hot-toast';

export const CreateTask = ({tasks, setTasks}) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title) {
      
      return toast.error('Task name is required');
    }

    if (!task.description) {
      return toast.error('Task description is required');
    }
    
    setTasks((prev) => {
      const taskWithId = { ...task, id: Date.now() }
      const list = [...prev, taskWithId];
      localStorage.setItem('tasks', JSON.stringify(list));
      return list;
    });
  }


  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={task.title}
            onChange={(e) => setTask((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={task.description}
            onChange={(e) => setTask((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
