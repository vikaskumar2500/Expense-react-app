import React, { useEffect, useState } from "react";
import "./VerificationPending.css"; // Import the CSS for styling
import { useHistory } from "react-router-dom";
import { auth } from "../Firebase";

const VerificationPending = () => {
  const [time, setTime] = useState(0);
  const history = useHistory();
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const user = auth.currentUser;

      const token = await user?.getIdToken();
      console.log(token);
      if (user) {
        await user.reload(); // Refresh the user data
        setTime((prev) => prev + 1);
        if (user.emailVerified) {
          localStorage.setItem(token, JSON.stringify(user));
          history.push("/login");
        }
      }
    };
    if (time <= 12) {
      const interval = setInterval(checkVerificationStatus, 5000); // Checking every 5 seconds
      return () => clearInterval(interval);
    } else {
      alert("You have exceeded the time limit!! please verify your email again");
      history.push("/signup");
    }
  }, [history, time]);

  return (
    <div className="verification-pending-container">
      <h2>Verification Pending...</h2>
      <p>Please check your email to verify your account.</p>
    </div>
  );
};

export default VerificationPending;
