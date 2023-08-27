import { Row, Col } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";

import "./Profile.css";

const Profile = () => {
  const history = useHistory();

  return (
    <div className="profile">
      <button
        type="button"
        className="cancel-profile"
        onClick={() => {
          history.push("/signup");
        }}
      >
        X
      </button>
      <Row className="row">
        <Col className="quote">Welcome to the Expense Tracker</Col>
        <Col className="about">
          Your profile is incomplete.{" "}
          <NavLink to="/profile-completion" className="complete-link">
            Complete now
          </NavLink>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
