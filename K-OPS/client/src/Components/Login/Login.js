import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/Login.css";
import axios from "axios";
import { serverURL } from "../../serverConfig";

// headers: {
//   Autherization: `Bearer ${localStorage.getItem("token")}`,
// },

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

    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;

    console.log(email);
    console.log(password);
    // navigate("/KSEB");
    // navigate("/ration");
    axios
      .post(
        `http://${serverURL}:3001/admin/operators-auth`,
        {
          regId: email,
          password: password,
        },
        {}
      )
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          localStorage.setItem("token", response.data.token);
        }
        if (response.data.operator === "Kseb") {
          navigate("/KSEB");
        } else if (response.data.operator === "Hospital") {
          navigate("/hospital");
        } else if (response.data.operator === "RationShop") {
          navigate("/ration");
        } else {
          alert("Enter Correct Id and Password");
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };

  const goToAdminPage = (e) => {
    const email = e.target.elements[0].value;
    const password = e.target.elements[1].value;
    e.preventDefault();
    // navigate("/KSEB");
    // navigate("/admin");
    axios
      .post(
        `http://${serverURL}:3001/admin/self-auth`,
        {
          regId: email,
          password: password,
        },
        {}
      )
      .then(function (response) {
        if (response.data.status === "ok") {
          navigate("/admin");
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
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
              <label htmlFor="">Register Id</label>
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
              <label htmlFor="">Register Id</label>
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
