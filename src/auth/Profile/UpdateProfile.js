import { Col, Row } from "react-bootstrap";
import { useState } from "react";

import "./UpdateProfile.css";
import UpdateProfileForm from "../../components/Form/UpdateProfileForm";
import { auth } from "../../Firebase";

const UpdateProfile = () => {
  const user = auth.currentUser;
  const [isUpdated, setIsUpdated] = useState(user ? true : false);

  const updateHandler=(update)=> {
    setIsUpdated(update);
  }
  return (
    <div className="update-profile mb-5">
      <Row className="row-header">
        <Col className="quote">Winners never quite, Quitters never win.</Col>
        <Col className="about">
          Your profile is{" "}
          <span style={{ fontWeight: "bold" }}>
            {isUpdated ? "100%" : "0%"}
          </span>
          completed. A complete profile has higher chances of landing a job.{" "}
          <a href="#2" className="complete-link">
            {isUpdated ? "Completed" : "Complete now"}.
          </a>
        </Col>
      </Row>
      <UpdateProfileForm onUpdated={updateHandler}/>
    </div>
  );
};

export default UpdateProfile;
