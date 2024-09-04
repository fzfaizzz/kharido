import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './pages/Mainpage';
import Login from './pages/Login';
import { Sling as Hamburger } from 'hamburger-react'  
import Nav from './pages/Nav'; 
import Singup from './pages/Singup';
import Forget from './pages/Forget';
import Newpassword from './pages/Newpassword';
import Profile from './pages/Profile';
import {Toaster} from 'react-hot-toast'
import About from './pages/About';
import Policy from './pages/policy';

function App() {
  return (
    <Router>
     
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/explore" element={<Nav />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/singup" element={<Singup/>}/>
          <Route path="/forget" element={<Forget/>} ></Route>
          <Route path="/newpassword" element={<Newpassword/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/about" element={<About/>}></Route>
          <Route path="/policy" element={<Policy/>}></Route>

        </Routes>
        <Toaster/>
    </Router>
  );
}

export default App;
