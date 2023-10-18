import React from "react";
import Navbar from "../Nav/Navbar";
import Avatar from "@mui/material/Avatar";
import "./myProfile.css";

function MyProfile(){
    return(
        <div>
            <Navbar />
            <section className="profileHeader">
            <section className="profileImage">
                <img id="profileimg" src="https://img.freepik.com/free-photo/dramatic-white-clouds-blue-sky-from-airplane-window-view-colorful-sunset-cloudscape-background_90220-1208.jpg" alt="user Image"/>
            </section>
            <section className="profileAvtar">
                <Avatar />
            
            <section>
                <h3>Name</h3>
            </section>
            <section>
                <button>Learn More</button>
                <button>Following</button>
                <button>Message</button>
            </section>
            </section>

            </section>
            
        </div>
    )
}

export default MyProfile;