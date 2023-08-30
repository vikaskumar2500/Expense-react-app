import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { authActions } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { themeActions } from "../../store/Slices/themeSlice";

const NavBar = () => {
  const [showPremium, setShowPremium] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const history = useHistory();
  const expenses = useSelector((state) => state.expense.expenses);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    signOut(auth)
      .then((credential) => {
        history.push("/signup");
        localStorage.removeItem(auth?.currentUser.email);
        dispatch(authActions.logout());
      })
      .catch((error) => alert(error.message));
  };

  const handlePremiumToggle = () => {
    setShowPremium((prev) => !prev);
  };

  const handleDownload = (e) => {
    const blob = new Blob([...JSON.stringify(expenses)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const toggleButtonHandler = () => {
    setIsDarkTheme((prev) => !prev);
    if (isDarkTheme) dispatch(themeActions.darkTheme());
    else dispatch(themeActions.lightTheme());
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="navbar-container bg-body-tertiary"
    >
      <Container className="container">
        <h2 className="brand">Expense-Tracker</h2>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-collapse">
          <Nav className="me-auto">
            <NavLink to={`/daily-expenses-form`}>Daily Expenses</NavLink>

            <NavLink to="/profile">Profile</NavLink>
            <div className="premium-dropdown">
              <Button variant="outline-warning" onClick={handlePremiumToggle}>
                Activate Premium
              </Button>
              {showPremium && (
                <div className="premium-dropdown-content d-flex mb-2">
                  <Button
                    variant={isDarkTheme ? "secondary" : "light"}
                    className="mb-2 my-3"
                    onClick={toggleButtonHandler}
                  >
                    {isDarkTheme ? "dark theme" : "light theme"}
                  </Button>
                  <Button
                    variant="primary"
                    className="mb-2 text-decoration-underline"
                    onClick={handleDownload}
                  >
                    Download .csv
                  </Button>
                </div>
              )}
            </div>
          </Nav>
          <Nav>
            <NavLink to="/" exact>
              Signup
            </NavLink>
            <NavLink to="/login">Login</NavLink>
          </Nav>
          <Button
            variant="outline-danger"
            className="logout"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
