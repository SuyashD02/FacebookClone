import React from "react";
import "./LeftContent.css";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import EmojiFlagsRoundedIcon from "@mui/icons-material/EmojiFlagsRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { userMap } from "../Datastoar";
import { Link } from "react-router-dom";
function LeftContent() {
  const userIdForLeft = localStorage.getItem("userId");
  const userNameForLeft = localStorage.getItem("userName");
  
  return (
    <div className="left-sidebar">
    <Link className="leftUserName" to={"/profile"}>
      <ListItemButton>
        <div id="nameLeftBar">
          {userMap.get(userIdForLeft) && (
           
            <Avatar
              sx={{ width: 40, height: 40 }}
              src={userMap.get(userIdForLeft)?.photo}
            ></Avatar>
            
          )}
          <p >{userNameForLeft}</p>
        </div>
      </ListItemButton>
      </Link>
      <Link className="leftUserName" to={"/commingSoon"}>
      <ListItemButton>
        <div id="covidInfoLeftBar">
          <LocalHospitalRoundedIcon className="leftIcon" sx={{ width: 35, height: 35 }} />
          <p>COVID-19 Information Center</p>
        </div>
      </ListItemButton>
      </Link>
      <Link className="leftUserName" to={"/createPage"} >
      <ListItemButton>
        <div id="pagesLeftBar">
            
          <EmojiFlagsRoundedIcon className="leftIcon" sx={{ width: 35, height: 35 }}/>
          <p>Pages</p>
          
        </div>
      </ListItemButton>
      </Link>
      <Link className="leftUserName" to={"/commingSoon"}>
      <ListItemButton>
        <div id="friendsLeftBar">
          <PeopleAltRoundedIcon className="leftIcon" sx={{ width: 35, height: 35 }}/>
          <p>Friends</p>
        </div>
      </ListItemButton>
      </Link>
      <Link className="leftUserName" to={"/commingSoon"}>
      <ListItemButton>
        <div id="messangerLeftBar">
          <ChatRoundedIcon className="leftIcon" sx={{ width: 35, height: 35 }}/>
          <p>Messanger</p>
        </div>
      </ListItemButton>
      </Link>
    </div>
  );
}
export default LeftContent;
