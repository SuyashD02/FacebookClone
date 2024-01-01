import React, { useState ,useE } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useAuth } from "../Context/Context";
import { userMap } from "../Datastoar";


export default function LoginPage() {
  const projectID = "7n1a3lrketcp";

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [correctCredential,setCorrectCredential]=useState(false);
  const navigate = useNavigate();
  const {setToken}=useAuth();

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
        const data = await response.json();
        // console.log(data);

        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("userName",data.data.name);
        if(userMap.has(data.data._id)==false){
         
        userMap.set(data.data._id,{"name":data.data.name,"photo":"https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/995.jpg"})
        }
        
        setIsLoggedIn(true);
        navigate("/Main");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setCorrectCredential(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  

  return (
    <div className="login">
      <div className="left-Content">
        <div className="login-left">
          <div className="loginLeftContent">
          <h1 id="loginHeading">Facebook</h1>
          <p id="login-para">
            Facebook helps you connect and share with the people in your life.
          </p>
          </div>
        </div>
      </div>
      <div className="right-Content">
        <div className="login-right">
          
          <Box className="inputSection">
            <div className="input">
              <p style={{display:!correctCredential?"none":"",color:"red",textAlign:"center"}}>{errorMessage}</p>
              <input
                type="email"
                id="emailInput"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
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
              </div>
              <div id="h-Line"></div>
              <div className="createNew-Btn">
              <Link to={"/signup"}>
              <button id="createBtn">Create a new account</button>
              </Link>
              </div>

            </div>
          </Box>
         
          
        </div>
        
      </div>
    </div>
  );
}
