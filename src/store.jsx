// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers/todoSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export default store;
