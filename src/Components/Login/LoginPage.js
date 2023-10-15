import React, { useState } from "react";
import "./Login.css";
import HomePage from "../Home Page/HomePage";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function LoginForm() {
  const projectID = "f104bi07c490";

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  function mailInput(e) {
    const mailSet = e.target.value;
    setMail(mailSet);
  }

  function passwordInput(e) {
    const passwordSet = e.target.value;
    setPassword(passwordSet);
  }

  async function handleLoginClick() {
    try {
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: projectID,
          },
          body: JSON.stringify({
            email: mail,
            password: password,
            appType: "facebook",
          }),
        }
      );
      if (response.ok) {
        console.log("Successfully logged in");
        setIsLoggedIn(true);
        navigate("/HomePage");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  if (isLoggedIn) {
    return <HomePage />;
  }

  return (
    <div className="login">
      <div className="left-Content">
        <div className="login-left">
          <h1 id="loginHeading">Facebook</h1>
          <p id="login-para">
            Facebook helps you connect and share with the people in your life.
          </p>
        </div>
      </div>
      <div className="right-Content">
        <div className="login-right">
          
          <Box className="inputSection">
            <div className="input">
              <input
                type="email"
                id="emailInput"
                value={mail}
                onChange={mailInput}
                placeholder="Email address or phone number"
              />

              <input
                type="password"
                id="passwordInput"
                value={password}
                onChange={passwordInput}
                placeholder="Password"
              />
            </div>
            <div id="buttons">
              <div className="loginFBtn">
              <button id="logIn-Button" onClick={handleLoginClick}>
                Log in
              </button>
              <h6 id="forgot-Btn">Forgotten Password?</h6>
              </div>
              <div id="h-Line"></div>
              <div className="createNew-Btn">
              <button id="createBtn">Create a new account</button>
              </div>
            </div>
          </Box>
         
          
        </div>
        
      </div>
    </div>
  );
}
