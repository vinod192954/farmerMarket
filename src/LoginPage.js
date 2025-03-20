import { useState, useEffect } from "react";
import "./LoginPage.css";
import AuthForm from "./AuthForm";

const LoginPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [authType, setAuthType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  const handleOpenPopup = (type) => {
    setAuthType(type); // Set "register" or "login"
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // Check again if login was successful (token stored)
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  };

  console.log(isAuthenticated, "isAuthenticated");

  return (
    <div className="login-container-options">
      {!isAuthenticated ? (
        <>
          <button
            className="btn sign-up"
            onClick={() => handleOpenPopup("register")}
          >
            Sign Up
          </button>
          <button
            className="btn sign-in"
            onClick={() => handleOpenPopup("login")}
          >
            Sign In
          </button>
        </>
      ) : (
        <div className="user-info">
          <p>🎉 Welcome to our platform! Enjoy your experience. 🚀</p>
        </div>
      )}

      <AuthForm type={authType} open={showPopup} onClose={handleClosePopup} />
    </div>
  );
};

export default LoginPage;
