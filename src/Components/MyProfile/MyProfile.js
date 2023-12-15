import React,{useEffect,useState}from "react";
import Navbar from "../Nav/Navbar";
import Avatar from "@mui/material/Avatar";
import "./myProfile.css";
import { userMap } from "../Datastoar";


function MyProfile(){

    const [userProfile, setUserProfile] = useState(null);
    const bearerToken = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const fetchData = async () => {
        const response = await fetch(
          `https://academics.newtonschool.co/api/v1/facebook/user/${userId}`,
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
        // console.log("profile Data", data);
      };

      useEffect(() => {
        fetchData("userId");
      }, []);
    return(
        <div >
            <Navbar />
            <section className="myProfileContent">
            <section className="profileHeader">
            <section className="profileImage">
                <img id="profileimg" src={userMap.get(userId)?.photo} alt="user Image"/>
            </section>
            <section className="profileAvtar">
                <div className="profileAvtarDiv">
            <section className="avtarProfile">
            {userMap.get(userId) && (
                            <Avatar sx={{ width: 135, height: 135 }} src={userMap.get(userId)?.photo}></Avatar>
                            )}
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
            <section className="boxIntroUser">
              <h3>Intro</h3>
                <div>
                  {userProfile?.education &&
                  userProfile.education.map((edu,index)=>(
                    <div className="introEducation" key={index}>
                      <h3><img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/H804hWf2rBh.png"/>School:{edu.schoolName}</h3>
                      <p>Degree{edu.degree}</p>
                      <p>End Date:{edu.endDate}</p>
                    </div>
                  ))
                  }
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
            
        </div>
    )
}

export default MyProfile;