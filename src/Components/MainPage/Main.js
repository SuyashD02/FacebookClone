import React from "react";
import Navbar from "../Nav/Navbar";
import HomePage from "../Home Page/HomePage";
import RightComponent from "../RightComponent/RightComponent";
import LeftContent from "../LeftContent/LeftContent";

function Main(){
    return(
        <div>
            <Navbar />
            <LeftContent/>
            <RightComponent/>
            <HomePage />
            
        </div>
    )
}
export default Main;