import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import logo from './stonkArrow.png';
import {useCookies} from 'react-cookie'

function Navbar() {

  // const [isLoggedin, setIsLoggedin] = useState(false);

  const [cookies, setCookie] = useCookies(["user"]);
  const logout = () => {
    localStorage.removeItem('token-info');
    cookies.remove("user");
    // setIsLoggedin(false);
  };

  return (
    <nav>
      <div className="Header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1><Link to="/us">Stonk Area</Link></h1> 
        <hr style={{ color: 'black', height: '0.5px' }} />
        <ul>
          <li>
            {cookies.user && <p>{cookies.user}</p>}
          </li>
          <li>
            <p><Link onClickCapture={logout} to="/">Logout</Link></p >
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;