
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./Slices/authSlice";
import { expenseSlice } from "./Slices/expenseSlice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, expense: expenseSlice.reducer },
});



export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;

export default store;
