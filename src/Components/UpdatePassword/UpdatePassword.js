import { Box, Divider } from "@mui/material";
import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";
import "./UpdatePassword.css";
function UpdatePassword(){

    const [mail, setMail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate();
    const {settoken}=useAuth();

    function mailInput(e) {
        const mailSet = e.target.value;
        setMail(mailSet);
      }
      function CurrentPassword(e) {
        const passwordSet = e.target.value;
        setCurrentPassword(passwordSet);
      }
    
      function passwordInput(e) {
        const passwordSet = e.target.value;
        setNewPassword(passwordSet);
      }
    
      function firstNameInput(e) {
        const firstNameSet = e.target.value;
        setFirstName(firstNameSet);
      }

      {/*async function makeAPICall() {

        console.log("update called");
        
        ///Anurag////
        
        const loginresponse = await fetch(
        
        'https://academics.newtonschool.co/api/v1/user/login',
        
        {
        
        method: "POST",
        
        headers: {
        
        projectId: "f104bi07c490",
        
        "Content-Type": "application/json",
        
        },
        
        body: JSON.stringify({
        
        email: "rohan@gmail.com",
        
        password: "rohan",
        
        appType: "facebook",
        
        })
        
        });
        
        const loginjson = await loginresponse.json();
        
        console.log(loginjson);
        setBearerToken(loginjson.token);
        const token = loginjson.token;
        console.log("bearer token after successful login "+getBearerToken());
        
        //////
        
        //const token = getBearerToken();
        
        
        console.log("token in starting in update " + token);
        
        const response = await fetch(
        
        'https://academics.newtonschool.co/api/v1/user/updateMyPassword',
        
        {
        
        method: "PATCH",
        
        headers: {
        
        projectId: "f104bi07c490",
        
        "Content-Type": "application/json",
        
        Authorization: `Bearer ${token}`,
        
        },
        
        body: JSON.stringify({
        
        name: "rohan",
        
        email: mail,
        
        passwordCurrent: currentPassword,
        
        password: newPassword,
        
        appType: "facebook",
        
        })
        
        });
        
        //console.log(response);
        
        const json = await response.json();
        
        console.log(json);
        
        console.log("token after update call " +json.token);
        
        }*/}




      async function handleUpdate() {
        console.log("Function is called");
        try {
          const userToken = localStorage.getItem("token");
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                projectID: "f104bi07c490",
                Authorization: `Bearer ${userToken}`
              },
              body: JSON.stringify({
                name:firstName,
                email: mail,
                passwordCurrent: currentPassword,
                password: newPassword,
                appType: "facebook",
              }),
            }
          );
          const json = await response.json();
          console.log(json);
          console.log("token after update call " +json.token)
          if (response.ok) {
            console.log("Succecfully Updated Password");
            localStorage.removeItem("token");
            navigate("/");
          } else {
            setErrorMessage(json.message);
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
     
    return(
        <div className="updatePassword">
            <div>
            <section className="headingForgotten">
          <h1>facebook</h1>
        </section>
        <Box>
            <div className="updateBox">
            <section className="updateBoxHeader">
              <h3>Update Password</h3>
              <h5 id="forgottenh5">It's quick and easy</h5>
            </section>
            <Divider className="updateDivider"/>
            <section className="forgottenName">
              <input
                type="text"
                id="updateName"
                value={firstName}
                onChange={firstNameInput}
                placeholder="First name"
              />
            </section>
            <section className="updateInput">
              <input
                type="email"
                id="forgottenEmail-address"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />
              <input
                type="password"
                id="forgottenCurrent-Password"
                value={currentPassword}
                onChange={CurrentPassword}
                placeholder="Current password"
              />
              <input
                type="password"
                id="forgottenNew-Password"
                value={newPassword}
                onChange={passwordInput}
                placeholder="New password"
              />
            </section>
            <section className="forgottenBtnSection">
              <div>
                <button className="updatedateBtn" onClick={handleUpdate}>Update</button>
                </div>
                <div>
                <Link to={"/"}>
              <button className="updateBackBtn">Back</button>
              </Link>
              </div>

              </section>
              
            </div>
        </Box>
            </div>
        </div>
    )
}
export default UpdatePassword;