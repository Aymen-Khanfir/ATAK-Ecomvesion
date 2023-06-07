import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  // THE USER ID IN THE MOCK DATA
  // WE ASSUM THAT THE USER HAS LOGiN AND HAVE THE ID
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
