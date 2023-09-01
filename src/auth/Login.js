import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  FormFloating,
} from "react-bootstrap";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { NavLink, useHistory } from "react-router-dom";


import "./Login.css";
import { auth } from "../Firebase";
import { authActions } from "../store/store";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const history = useHistory();

  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
  // redux used.
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // console.log(currentUser);
      if (currentUser) return currentUser;
    });
  }, [history]);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        // console.log(credential);
        setIsLoading(false);
        console.log("login successfully!!");

        if (credential.user.emailVerified) {
          dispatch(authActions.login());
          localStorage.setItem("isLoggedIn", JSON.stringify(isAuthenticated));
          // onLogin(true);
          history.push(`/daily-expenses-form`);

          // reset the values
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
        } else {
          const actionCodeSettings = {
            url: "https://expense8-react.firebaseapp.com/email-verified",
            handleCodeInApp: true,
          };
          sendPasswordResetEmail(credential.user, actionCodeSettings)
            .then(() => {
              alert("Verification link sent again! please check your email");
              history.push("/verification-pending");
            })
            .catch((error) => alert(error.message));
        }
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
      });
  };

  // console.log(isEmailVerified);
  return (
    <Form className="form" onSubmit={formSubmitHandler}>
      <h3 className="title">Login</h3>
      <Row className="row">
        <Col md className="col">
          <FloatingLabel controlId="floatingInputEmail" label="Email">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref={emailInputRef}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="row">
        <Col md className="col">
          <FloatingLabel controlId="floatingInputPassword" label="Password">
            <FormFloating>
              <span
                role="button"
                className="show-button"
                onClick={() => {
                  setIsVisible((prev) => !prev);
                }}
              >
                {isVisible ? (
                  <img src="./assets/visible.png" alt="not found"></img>
                ) : (
                  <img src="./assets/hide.png" alt="not found"></img>
                )}
              </span>{" "}
            </FormFloating>
            <Form.Control
              type={isVisible ? "text" : "password"}
              placeholder="Enter password"
              ref={passwordInputRef}
              required
            />
          </FloatingLabel>
        </Col>
        <NavLink to="/forgot-password">Forgot password?</NavLink>
      </Row>

      {!isLoading && (
        <Button type="submit" variant="success" className="signup-button">
          Login
        </Button>
      )}
      {isLoading && <p style={{ textAlign: "center" }}>Sending request...</p>}

      <Row className="row">
        <Col className="sublogin">
          Don't have account? <NavLink to="/signup">Signup</NavLink>
        </Col>
      </Row>
    </Form>
  );
};

export default Login;
