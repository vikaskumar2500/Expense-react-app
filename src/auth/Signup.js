import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  FormFloating,
  Row,
} from "react-bootstrap";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { NavLink, useHistory } from "react-router-dom";

import "./Signup.css";
import { auth } from "../Firebase";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  // console.log(auth);
  const history = useHistory();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confrimPassword = confirmPasswordInputRef.current.value;

    if (password.trim() !== confrimPassword.trim()) {
      alert("password doesn't match");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const actionCodeSettings = {
        url: "https://expense8-react.firebaseapp.com/email-verified",
        handleCodeInApp: true,
      };

      await sendEmailVerification(userCredential.user, actionCodeSettings);

      alert("Verification email sent. Please check your email.");

      history.push("/verification-pending");
    } catch (error) {
      alert(error.message);
    }
    setIsLoading(false);
  };

  return (
    <Form className="form" onSubmit={formSubmitHandler}>
      <h3 className="title">Signup</h3>
      <Row className="row">
        <Col md className="col">
          <FloatingLabel controlId="floatingInputGrid" label="Email">
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref={emailInputRef}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="row">
        <Col className="col">
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
              // type={isPasswordVisible ? "text" : "password"}
              placeholder="Enter password"
              ref={passwordInputRef}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="row">
        <Col md className="col">
          <FloatingLabel
            controlId="floatingInputConfirmPassword"
            label="Confirm Password"
          >
            <Form.Control
              type="password"
              placeholder="Enter Confirm password"
              ref={confirmPasswordInputRef}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      {!isLoading && (
        <Button type="submit" variant="success" className="signup-button">
          Signup
        </Button>
      )}
      {isLoading && <p style={{ textAlign: "center" }}>Sending request...</p>}

      <Row className="row">
        <Col className="sublogin">
          Already have an account? <NavLink to="/login">Login</NavLink>
        </Col>
      </Row>
    </Form>
  );
};

export default Signup;
