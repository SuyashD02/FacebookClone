import { Box, Divider } from "@mui/material";
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Context";
function Forgotten(){

    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasttName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate=useNavigate();
    const {token}=useAuth();

    function mailInput(e) {
        const mailSet = e.target.value;
        setMail(mailSet);
      }
    
      function passwordInput(e) {
        const passwordSet = e.target.value;
        setPassword(passwordSet);
      }
    
      function firstNameInput(e) {
        const firstNameSet = e.target.value;
        setFirstName(firstNameSet);
      }
      function lastNameInput(e) {
        const lastNameSet = e.target.value;
        setLasttName(lastNameSet);
      }

      async function handleUpdate() {
        console.log("Function is called");
        try {
          const response = await fetch(
            "https://academics.newtonschool.co/api/v1/user/updateMyPassword",
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                projectID: "f104bi07c490",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                name:`${firstName} ${lastName}`,
                email: mail,
                password:password, 
                appType: "facebook",
              }),
            }
          );
          if (response.ok) {
            console.log("Succecfully Updated Password");
            navigate("/");
          } else {
            const errorData = await response.json();
            setErrorMessage(errorData.message);
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMessage("An error occurred. Please try again.");
        }
      }
     
    return(
        <div>
            <div>
            <section className="headingForgotten">
          <h1>facebook</h1>
        </section>
        <Box>
            <div>
            <section className="boxHeader">
              <h3>Update Password</h3>
              <h5 id="forgottenh5">It's quick and easy</h5>
            </section>
            <Divider />
            <section className="forgottenName">
              <input
                type="text"
                id="first-Name"
                value={firstName}
                onChange={firstNameInput}
                placeholder="First name"
              />
              <input
                type="text"
                id="last-Name"
                value={lastName}
                onChange={lastNameInput}
                placeholder="Surname"
              />
            </section>
            <section className="forgottenMail">
              <input
                type="email"
                id="forgottenEmail-address"
                value={mail}
                onChange={mailInput}
                placeholder="Email address"
              />
              <input
                type="password"
                id="forgottenNew-Password"
                value={password}
                onChange={passwordInput}
                placeholder="New password"
              />
            </section>
            <section className="forgottenBtnSection">
                <button className="forgottenUpdateBtn" onClick={handleUpdate}>Sign Up</button>
              </section>
            </div>
        </Box>
            </div>
        </div>
    )
}
export default Forgotten;