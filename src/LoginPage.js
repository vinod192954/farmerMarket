import { useState } from "react";
import AuthPopup from "./AuthPopup";
import "./LoginPage.css";

const LoginPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState("");

  const handleOpenPopup = (type) => {
    setAuthType(type);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="login-container-options">
      <button className="btn sign-up" onClick={() => handleOpenPopup("signup")}>
        Sign Up
      </button>
      <button className="btn sign-in" onClick={() => handleOpenPopup("signin")}>
        Sign In
      </button>
      {showPopup && <AuthPopup type={authType} onClose={handleClosePopup} />}
    </div>
  );
};

export default LoginPage;
