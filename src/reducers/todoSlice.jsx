import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
    done: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    markAsDone: (state, action) => {
      const { taskId } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (taskIndex !== -1) {
        const doneTask = state.tasks.splice(taskIndex, 1)[0];
        state.done.push(doneTask);
      }
    },
  },
});

export const { addTask, markAsDone } = todoSlice.actions;
export default todoSlice.reducer;
