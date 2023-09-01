import React from "react";
import "./Expenses.css";
import ExpenseList from "./ExpenseList";
import ExpenseForm from "../Form/ExpenseForm";

const Expenses = () => {
  return (
    <div className="expenses">
      <ExpenseForm/>
      <ExpenseList />
    </div>
  );
};

export default Expenses;
