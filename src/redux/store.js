import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './auth/AuthSlice.js';

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
});