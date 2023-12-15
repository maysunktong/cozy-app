import { createSlice } from '@reduxjs/toolkit';

const TodoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
    done: [],
  },
  reducers: {
    addTask: (state, action) => {
      const { id, text, createDate } = action.payload;
      state.tasks.push({
        id,
        text,
        createDate: createDate || new Date().toLocaleString(),
      });
    },
    markAsDone: (state, action) => {
      const { taskId } = action.payload;
      const TaskIndex = state.tasks.findIndex((task) => task.id === taskId);

      if (TaskIndex !== -1) {
        const DoneTask = state.tasks.splice(TaskIndex, 1)[0];
        state.done.push(DoneTask);
      }
    },
  },
});

export const { addTask, markAsDone } = TodoSlice.actions;
export default TodoSlice.reducer;
