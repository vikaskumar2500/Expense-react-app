import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name:'theme',
  initialState:{colorNum:256},
  reducers:{
    lightTheme:(state)=> {
      state.colorNum = 256;
    },

    darkTheme:(state)=> {
      state.colorNum = 35;
    }
  }
})

export const themeActions =  themeSlice.actions;

export default themeSlice.reducer;