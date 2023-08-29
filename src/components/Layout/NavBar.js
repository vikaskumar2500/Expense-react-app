import { NavLink, useHistory } from "react-router-dom";
import "./NavBar.css";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";
import { authActions } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const totalPrice = useSelector(state=> state.expense.totalPrice);

  const logoutHandler = () => {
    signOut(auth)
      .then((credential) => {
        history.push("/signup");
        localStorage.removeItem(auth?.currentUser.email);
        dispatch(authActions.logout());
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container className="container">
        <h2 className="brand">Expense-Tracker</h2>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="nav-collapse">
          <Nav className="me-auto">
            <NavLink to={`/daily-expenses-form`}>Daily Expenses</NavLink>
            {totalPrice>=1000 && <NavLink to="/premium">Premium</NavLink>}
            <NavLink to="/profile">Profile</NavLink>
          </Nav>
          <Nav>
            <NavLink to="/"exact>Signup</NavLink>
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
