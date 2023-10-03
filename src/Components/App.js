import logo from '../logo.svg';
import '../Styles/App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import LoginPage from "./Login/LoginPage";
import Navbar from './Nav/Navbar';
import {Typography,AppBar,CssBaseline,Toolbar,Container} from '@mui/material';
function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        {/*<BasicModal />*/}
        <Navbar />
      
      <Routes>
        <Route path='/Login' element={LoginPage} />
      </Routes>
      </Router>
      
     
      
   
      
    </div>
  );
}

export default App;
