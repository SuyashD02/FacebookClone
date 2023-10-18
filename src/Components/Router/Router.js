import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import SignUp from "../Signup/SignUp";
import SearchComponent from "../SearchItem/SearchItem";
import Main from "../MainPage/Main";
import Forgotten from "../Forgotten Password/Forgotten";
import Page from "../Page/Page";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../MyProfile/MyProfile";


const Router =()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/updatePassword" element={<Forgotten />}/>
            <Route path="/signup" element={<SignUp />}/>
            

            
            <Route element={<PrivateRoute />}>
            <Route path="/Main" element={<Main />}/>
            <Route path="/profile" element={<MyProfile />} />
            
            <Route path="/search" element={<SearchComponent />}/>
            <Route path="/createPage" element={<Page />} />
            
            </Route>
        </Routes>
        
        </BrowserRouter>
    )
}
export default Router;