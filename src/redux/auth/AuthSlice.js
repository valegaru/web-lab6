import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  uid: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid;
    },
    logout: state => {
      state.uid = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
