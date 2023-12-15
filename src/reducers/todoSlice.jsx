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
    deleteDoneTask: (state, action) => {
      const { taskId } = action.payload;
      const DoneTaskIndex = state.done.findIndex((task) => task.id === taskId);

      if (DoneTaskIndex !== -1) {
        state.done.splice(DoneTaskIndex, 1);
      }
    },
  },
});

export const { addTask, markAsDone, deleteDoneTask } = TodoSlice.actions;
export default TodoSlice.reducer;
