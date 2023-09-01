import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import UpdateProfile from "./auth/Profile/UpdateProfile";
import Header from "./components/Layout/Header";
import Signup from "./auth/Signup";
import Profile from "./auth/Profile/Profile";
import Login from "./auth/Login";
import VerificationPending from "./auth/VerificationPending";
import Forgot from "./auth/Forgot";
import Expenses from "./components/Expenses/Expenses";
import { authActions } from "./store/store";
import fetchExpenseData from "./store/action-creator/fetchExpenseData";
import sendExpenseData from "./store/action-creator/sendExpenseData";
import { useSelector, useDispatch } from "react-redux";

let isInitial = true;

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const themeNum = useSelector((state) => state.theme.colorNum);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense);

  useEffect(() => {
    dispatch(fetchExpenseData());

    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) dispatch(authActions.login());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    dispatch(sendExpenseData(expenses));
  }, [expenses, dispatch]);

  // vanilla javascript used for the theme.
  const body = document.querySelector("body");
  body.style.backgroundColor = `rgb(${themeNum}, ${themeNum}, ${themeNum})`;

  return (
    <Router>
      <Header />
      <Switch>
        {!isAuthenticated && (
          <Route path="/" exact>
            <Signup />
          </Route>
        )}
        {!isAuthenticated && (
          <Route path="/login" exact>
            <Login />
          </Route>
        )}
        {!isAuthenticated && (
          <Route path="/signup" exact>
            <Signup />
          </Route>
        )}

        {isAuthenticated && (
          <Route path="/login">
            <Redirect to="/daily-expenses-form" />
          </Route>
        )}
        {isAuthenticated && (
          <Route path="/signup">
            <Redirect to="/daily-expenses-form" />
          </Route>
        )}

        {isAuthenticated && (
          <Route path={`/daily-expenses-form`} exact>
            <Expenses />
          </Route>
        )}

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
          {!isAuthenticated && <Redirect to="/signup" />}
          {isAuthenticated && <Redirect to="/daily-expenses-form" />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
