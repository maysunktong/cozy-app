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
      const taskWithIdAndDate = {
        ...task,
        id: Date.now(),
        createDate: new Date().toLocaleString(),
      };
      const list = [...prev, taskWithIdAndDate];
      localStorage.setItem('tasks', JSON.stringify(list));
      toast.success('Task successfully created 🎉');
      setTask({ title: '', description: '', status: 'todo' }); // Clear the task field
      return list;
    });
  };
  


  return (
    <div className='flex justify-center items-center gap-2 h-12 '>
      <form onSubmit={handleSubmit} className='flex justify-start items-center'>
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
