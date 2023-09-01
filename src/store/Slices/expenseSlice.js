import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalPrice: 0,
    edit: { price: "", desc: "", category: "default" },
  },
  reducers: {
    replaceExpense: (state, action) => {
      state.expenses = action.payload;
      state.totalPrice = action.payload.reduce(
        (total, expense) => total + expense.price,
        0
      );
    },
    addExpense: (state, action) => {
      const actionPrice = action.payload.reduce(
        (total, expense) => total + +expense.price,
        0
      );
      state.expenses = [...action.payload, ...state.expenses];
      state.totalPrice += actionPrice;
    },
    deleteExpense: (state, action) => {
      const targetExpense = state.expenses.find(
        (expense) => expense.id === action.payload
      );
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
      state.totalPrice = +state.totalPrice - +targetExpense.price;
    },
    editExpense: (state, action) => {
      state.edit = action.payload;
    },
  },
});
