import React,{useState} from 'react';
import '../Styles/App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from "./Login/LoginPage";

import HomePage from './Home Page/HomePage';
import {Typography,AppBar,CssBaseline,Toolbar,Container, Drawer} from '@mui/material';
import Navbar from './Nav/Navbar';
//import Drower from './Drower/Drower';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initialize the login state as false

  // Function to set the login state to true
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        {isLoggedIn ? <Navbar /> : <LoginPage />}
        <Routes>
          <Route
            path="/Login"
            element={<LoginPage onLogin={handleLogin} />} 
          />
        </Routes>
  </Router>
  {/*<Drower />*/}
  
      
     
      
   
      
    </div>
  );
}

export default App;
