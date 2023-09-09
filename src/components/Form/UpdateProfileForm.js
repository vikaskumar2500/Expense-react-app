import { useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  FloatingLabel,
  Button,
  Container,
} from "react-bootstrap";
import "./UpdateProfileForm.css";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../Firebase";

const UpdateProfileForm = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = auth.currentUser;

  const [profileDetails, setProfileDetails] = useState({
    profileName: user?.displayName,
    photoURL: user?.photoURL,
  });
  const [currentUser, setCurrentUser] = useState(user);

  const profileNameInputRef = useRef();
  const photoUrlInputRef = useRef();

  const history = useHistory();
  // console.log(user);
  useEffect(()=> {
    onAuthStateChanged(auth, currentUser=> {
      setCurrentUser(currentUser);
      return currentUser;
    });
  }, []);

  const formSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Update Running");
    const displayName = profileNameInputRef.current.value;
    const photoUrl = photoUrlInputRef.current.value;

    setIsLoading(true);
    if(user==null) alert("Update again!!");
    updateProfile(currentUser, { displayName: displayName, photoURL: photoUrl })
      .then(() => {
        console.log("profile update successfull");
        setIsLoading(false);
        setProfileDetails((prevState) => ({
          ...prevState,
          displayName: displayName,
          photoURL: photoUrl,
        }));
        props.onUpdated(true);
        profileNameInputRef.current.value = "";
        photoUrlInputRef.current.value = "";
      })
      .catch((error) => {
        alert(error.message);
        setIsLoading(false);
        props.onUpdated(false);
      });
  };

  const editButtonHandler = () => {
    profileNameInputRef.current.value = profileDetails.profileName;
    photoUrlInputRef.current.value = profileDetails.photoURL;
  };

  return (
    <Container className="update-profile-container">
      <Form className="update-form" onSubmit={formSubmitHandler}>
        <Row className="d-flex justify-content-between  mb-4 mt-3">
          <Col>
            <h2>Contact Details</h2>
          </Col>
          <Col xs={1} className="mx-3">
            <Button
              variant="outline-danger"
              onClick={() => {
                history.push("/signup");
              }}
            >
              Cancel
            </Button>
          </Col>
        </Row>
        <Row className="row">
          <Col md className="col">
            <FloatingLabel controlId="floatingInputName" label="Full Name">
              <Form.Control
                type="text"
                placeholder="Enter your name"
                ref={profileNameInputRef}
              />
            </FloatingLabel>
          </Col>
          <Col md className="col">
            <FloatingLabel
              controlId="floatingInputPhototURL"
              label="Profile Photo URL"
            >
              <Form.Control
                type="url"
                placeholder="https://something.jpg"
                ref={photoUrlInputRef}
              />
            </FloatingLabel>
          </Col>
        </Row>
        {!isLoading && (
          <Button
            type="submit"
            variant="primary"
            className="m-5 mx-0 mb-1 update"
          >
            Update
          </Button>
        )}
        {isLoading && <p style={{ textAlign: "center" }}>Sending request...</p>}

        <Button
          type="button"
          variant="danger"
          className="m-5 mx-2 mb-1 edit"
          onClick={editButtonHandler}
        >
          Edit
        </Button>
      </Form>
    </Container>
  );
};

export default UpdateProfileForm;
