import React,{useEffect,useState} from "react";
import Navbar from "../Nav/Navbar";
import Avatar from "@mui/material/Avatar";

import { userMap } from "../Datastoar";
import { useAuth } from "../Context/Context";
import { Box } from "@mui/material";


function UserProfile(){

    const [userProfile, setUserProfile] = useState("");
    const bearerToken = localStorage.getItem("token");
    const {postUserId} = useAuth();

    const fetchData = async () => {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/facebook/user/${postUserId}`,
          {
            method:"Get",
            headers: {
              Authorization: `Bearer ${bearerToken}`,
              projectID: "f104bi07c490",
            },
          }
        );
        const data = await response.json();
        setUserProfile(data.data);
        console.log("User profile Data", data);
      };

      useEffect(() => {
        fetchData();
      }, []);
    return(
        <div >
            <Navbar />

          
            <Box >
            <section className="myProfileContent">
            
            <section className="profileHeader">
            <section className="profileImage">
                <img id="profileimg" src={userProfile?.profileImage} alt="user Image"/>
            </section>
            <section className="profileAvtar">
                <div className="profileAvtarDiv">
            <section className="avtarProfile">
            
                            <Avatar sx={{ width: 135, height: 135 }} src={userProfile?.profileImage}></Avatar>
                           
           </section>
            
            <section>
            <h3 className="userProfileName">{userProfile?.name}</h3>
            </section>
            <section>
                <button>Learn More</button>
                <button>Following</button>
                <button>Message</button>
            </section>
            </div>
            </section>

            </section>
            <section className="">
              <h3>Intro</h3>
                <div>
                  {/* <h3>{userProfile?.education}</h3> */}
                </div>
                <div>
                <h3>{userProfile?.email}</h3>
                </div>
                <div>
                  {/* <h3>{userProfile?.workExperience}</h3> */}
                </div>
                <div>

                </div>

            </section>
            
            </section>
            </Box>
           
            
        </div>
    )
}

export default UserProfile;