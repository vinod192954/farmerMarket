import React from "react";
import "./AuthPopup.css";

const AuthPopup = ({ type, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2>{type === "signup" ? "Sign Up As" : "Sign In As"}</h2>
        <div className="popup-options">
          <button className="popup-btn">Buyer</button>
          <button className="popup-btn">Seller</button>
        </div>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default AuthPopup;
