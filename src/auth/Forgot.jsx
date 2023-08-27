import { useRef, useState } from "react";
import { Form, Row, Col, FloatingLabel, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./Forgot.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";

const Forgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef();

  const history = useHistory();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current.value;
    const actionCodeSettings = {
      url: "https://expense8-react.firebaseapp.com/email-verified",
      handleCodeInApp: true,
    };
    setIsLoading(true);
    sendPasswordResetEmail(auth, email, actionCodeSettings)
      .then(() => {
        alert("Reset link sent! please check your email");
      })
      .catch((error) => {
        alert(error.message);
      });
    setIsLoading(false);
  };

  return (
    <Form className="forgot-form" onSubmit={formSubmitHandler}>
      <h3>Forgot password</h3>
      <button
        type="button"
        className="cancel-button"
        onClick={() => {
          history.push("/login");
        }}
      >
        X
      </button>
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
      {!isLoading && (
        <Button type="submit" variant="success" className="forgot-button">
          Forgot password
        </Button>
      )}
      {isLoading && <p style={{ textAlign: "center" }}>Sending request...</p>}
    </Form>
  );
};

export default Forgot;
