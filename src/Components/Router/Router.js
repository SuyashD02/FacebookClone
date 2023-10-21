import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import SignUp from "../Signup/SignUp";
import SearchComponent from "../SearchItem/SearchItem";
import Main from "../MainPage/Main";
import Page from "../Page/Page";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MyProfile from "../MyProfile/MyProfile";
import DetailPage from "../Page/DetailPage";
import UpdatePassword from "../UpdatePassword/UpdatePassword";


const Router =()=>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/updatePassword" element={<UpdatePassword />}/>
            <Route path="/signup" element={<SignUp />}/>
            

            
            <Route element={<PrivateRoute />}>
            <Route path="/Main" element={<Main />}/>
            <Route path="/profile" element={<MyProfile />} />
            
            <Route path="/search" element={<SearchComponent />}/>
            <Route path="/createPage" element={<Page />} />
            <Route path="/createPage/page" element={<DetailPage />}/>
            
            </Route>
        </Routes>
        
        </BrowserRouter>
    )
}
export default Router;