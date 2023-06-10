import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  const goToUserPage = (e) => {
    e.preventDefault();
    // navigate("/KSEB");
    navigate("/ration");
  };

  const goToAdminPage = (e) => {
    e.preventDefault();
    // navigate("/KSEB");
    navigate("/admin");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        className={`wrapper ${isSignUp ? "animate-signIn" : "animate-signUp"}`}
      >
        <div className="form-wrapper sign-up">
          <form onSubmit={goToAdminPage}>
            <h2>Administrator</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label htmlFor="">Password</label>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="sign-link">
              <p>
                <a href="#" className="signIn-link" onClick={handleSignInClick}>
                  Login as a User
                </a>
              </p>
            </div>
          </form>
        </div>

        <div className="form-wrapper sign-in">
          <form onSubmit={goToUserPage}>
            <h2>Login</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label htmlFor="">Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="sign-link">
              <p>
                <a href="#" className="signUp-link" onClick={handleSignUpClick}>
                  Login as Administrator
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
