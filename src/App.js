import { Redirect, BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import UpdateProfile from "./auth/Profile/UpdateProfile";
import Header from "./components/Layout/Header";
import Signup from "./auth/Signup";
import Profile from "./auth/Profile/Profile";
import Login from "./auth/Login";
import VerificationPending from "./auth/VerificationPending";
import Forgot from "./auth/Forgot";
import { UserAuth } from "./store/AuthContext";
import ExpenseForm from "./components/Form/ExpenseForm";
import Expenses from "./components/Expenses/Expenses";

const App = () => {
  const { login } = UserAuth();

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>

        <Route path={`/daily-expenses-form`} exact>
          <ExpenseForm />
          <Expenses/>
        </Route>

        {login && (
          <Route path="/profile-completion" exact>
            <UpdateProfile />
          </Route>
        )}

        {login && (
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
