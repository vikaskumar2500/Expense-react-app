import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext({
  user: {},
  login: null,
  onLogin: () => {},
  expenses: {},
  totalPrice: 0,
  addExpense: () => {},
  deleteExpense: () => {},
  editExpense: {},
  onEditExpense: () => {},
});

const defaultExpense = {
  expenses: [],
  totalPrice:0,
};

const expenseReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      expenses: [action.expense, ...state.expenses],
      totalPrice: state.totalPrice + +action.expense.price,
    };
  } else if (action.type === "DELETE") {
    const targetExpense = state.expenses.find(expense=> expense.id===action.id);
    return {
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
      totalPrice: +state.totalPrice - +targetExpense.price,
    };
  } else return defaultExpense;
};

export const AuthProvider = (props) => {
  const [user, setUser] = useState({});
  const currentUser = auth.currentUser;
  const [login, setLogin] = useState(currentUser ? true : false);
  const [expenseState, dispatchExpense] = useReducer(
    expenseReducer,
    defaultExpense
  );
  const [editExpense, setEditExpense] = useState({
    price: "",
    desc: "",
    category: "default",
  });

  const history = useHistory();

  useEffect(() => {
    const getItem = Object.keys(localStorage);
    // console.log(email);

    if (getItem && getItem.includes(currentUser?.email)) {
      setLogin(true);
      history.push(`/daily-expenses`);
    }
  }, [history, currentUser]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        return currentUser;
      }
    });
  }, [history]);

  useEffect(() => {
    const fetchedExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        const keys = Object.keys(data);

        if (keys)
          keys.forEach((key) => {
            dispatchExpense({ type: "ADD", expense: data[key] });
          });
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    fetchedExpenses();
  }, []);

  const onLoginHandler = (isTrue) => {
    setLogin(isTrue);
  };

  const addExpenseHandler = (expense) => {
    dispatchExpense({ type: "ADD", expense: expense });
  };

  const defaultExpenseHandler = (id) => {
    dispatchExpense({ type: "DELETE", id: id });
  };

  const editExpenseHandler = (expense) => {
    setEditExpense({ ...expense });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: login,
        onLogin: onLoginHandler,
        expenses: expenseState.expenses,
        totalPrice: expenseState.totalPrice,
        addExpense: addExpenseHandler,
        deleteExpense: defaultExpenseHandler,
        editExpense: editExpense,
        onEditExpense: editExpenseHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
