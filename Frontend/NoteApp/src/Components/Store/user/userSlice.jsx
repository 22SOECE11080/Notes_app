import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const userslice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.data = action.payload;
    },
    registerUser: (state, action) => {
      state.data.push(action.payload);
    },
    setuser: (state, action) => {
      state.data = action.payload.user;
    },
  },
});

export const { loaduser, registerUser } = userslice.actions;

export default userslice.reducer;
