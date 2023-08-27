import { onAuthStateChanged } from "firebase/auth";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Firebase";
import { useHistory } from "react-router-dom";

export const AuthContext = React.createContext({
  user: {},
  login: null,
  onLogin: () => {},
  expenses: {},
  addExpense: () => {},
  deleteExpense: () => {},
});

const defaultExpense = {
  expenses:[],
};

const expenseReducer = (state, action) => {
  if (action.type === "ADD") {
    return {
      expenses:[action.expense, ...state.expenses],
    }
  } else if (action.type === "DELETE") {
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
        console.log(data);
        console.log(keys);
        keys.forEach(key=> {
          dispatchExpense({type:'ADD', expense:data[key]});
        })
      } catch (error) {
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
  console.log(expenseState.expenses);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: login,
        onLogin: onLoginHandler,
        expenses: expenseState.expenses,
        addExpense: addExpenseHandler,
        deleteExpense: defaultExpenseHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
