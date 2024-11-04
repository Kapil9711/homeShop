import { createSlice } from "@reduxjs/toolkit";

const intialState = {
  value: {},
  loading: true,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { serUser } = userSlice.actions;

export default userSlice.reducer;
