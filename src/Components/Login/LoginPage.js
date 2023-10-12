import React from "react";
import './Login.css';
export default function LoginForm() {
  return (
    <div className="login-Form">
      <div className="login-left">
        <h1 id="login-Heading">facebook</h1>
        <p id="login-para">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="login-right">
        <form className="input-Form">
          <input
            type="text"
            id="inputData"
            placeholder="Email address or phone number "
          ></input>
          <input
            type="password"
            id="inputData"
            placeholder="Password"
          ></input>
          <div id="buttons">
            <button id="login_Btn">Log in</button>
            <h6 id="forgotBtn">Forgotten Password?</h6>
            <div id="h-Line"></div>
            <button id="create-Btn">Create new account</button>
          </div>
        </form>
      </div>

    </div>
  );
}
