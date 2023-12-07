// src/components/TodoList.js
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, markAsDone } from '../reducers/todoSlice';

export const Todolist = () => {
  const [taskInput, setTaskInput] = useState('');
  const dispatch = useDispatch();
  const { tasks, done } = useSelector((state) => state.todo);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      dispatch(addTask({ id: Date.now(), text: taskInput }));
      setTaskInput('');
    }
  };

  const handleMarkAsDone = (taskId) => {
    dispatch(markAsDone({ taskId }));
  };

  return (
    <div>
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              {task.text}
              <button onClick={() => handleMarkAsDone(task.id)}>Mark as Done</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Done</h2>
        <ul>
          {done.map((doneTask) => (
            <li key={doneTask.id}>{doneTask.text}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};
