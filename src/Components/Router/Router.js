import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import SignUp from "../Signup/SignUp";
import SearchComponent from "../SearchItem/SearchItem";
import Main from "../MainPage/Main";



const Router =()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/Main" element={<Main />}/>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/search" element={<SearchComponent />}/>
            
        </Routes>
        
        </BrowserRouter>
    )
}
export default Router;