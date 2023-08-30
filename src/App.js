import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import UpdateProfile from "./auth/Profile/UpdateProfile";
import Header from "./components/Layout/Header";
import Signup from "./auth/Signup";
import Profile from "./auth/Profile/Profile";
import Login from "./auth/Login";
import VerificationPending from "./auth/VerificationPending";
import Forgot from "./auth/Forgot";
import Expenses from "./components/Expenses/Expenses";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./store/store";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const themeNum = useSelector((state) => state.theme.colorNum);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchedExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense8-react-default-rtdb.asia-southeast1.firebasedatabase.app/expenses.json"
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        const keys = Object.keys(data);

        if (keys) {
          const expenseArr = [];
          keys.forEach((key) => {
            expenseArr.push(data[key]);
          });
          // addExpense by using redux.🤨
          dispatch(expenseActions.addExpense(expenseArr));
        }
      } catch (error) {
        console.log(error.message);
        alert(error.message);
      }
    };
    fetchedExpenses();
  }, [dispatch]);

  // vanilla javascript used for the theme.
  const body = document.querySelector("body");
  body.style.backgroundColor = `rgb(${themeNum}, ${themeNum}, ${themeNum})`;

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Route path={`/daily-expenses-form`} exact>
          <Expenses />
        </Route>

        {isAuthenticated && (
          <Route path="/profile-completion" exact>
            <UpdateProfile />
          </Route>
        )}

        {isAuthenticated && (
          <Route path="/profile" exact>
            <Profile />
          </Route>
        )}
        <Route path="/forgot-password" exact>
          <Forgot />
        </Route>
        <Route path="/verification-pending" exact>
          <VerificationPending />
        </Route>

        <Route path="/*">
          <Redirect to="/signup" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
