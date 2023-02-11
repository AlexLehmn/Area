import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './LoginSystem.css'
import { useCookies, withCookies } from 'react-cookie'

function LoginSys() {

    const [cookies, setCookie] = useCookies(["user"]);

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/service');
    };

    const [usernameLog, setUsernameLog] = useState('')
    const [passwordLog, setPasswordLog] = useState('')
    const login = () => {
        axios.post('http://localhost:8080/login', {
            username: usernameLog,
            password: passwordLog
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.name)
                setCookie("user", usernameLog, { path: "/" });
                navigateHome()
            } else if (response.data.error) {
                setLoginStatus(response.data.error)
            }
        })
    };

    const [loginStatus, setLoginStatus] = useState('')

    return (
        <div className="App">
            <div className="login">
                <h1>LOG IN</h1>
                <label>Username</label>
                <div className="wrapper">
                    <div className="icon_1"></div>
                    <input className="input" type="text" placeholder="Username..." onChange={(e) => {
                        setUsernameLog(e.target.value);
                    }} />
                </div>
                <label>Password</label>
                <div className="wrapper">
                    <div className="icon_2"></div>
                    <input type="password" placeholder="Password..." onChange={(e) => {
                        setPasswordLog(e.target.value);
                    }} />
                </div>
                {passwordLog.length >= 3 ? null : <div className="text-danger m-1 ">password is too short</div>}
                <div className="text-danger m-1 ">{loginStatus}</div>
                <Link className="Navtext" to="/register">Create new account</Link>
                <button className='btn' onClick={login}>LOG IN</button>
            </div>
        </div>
    )
}

export default withCookies(LoginSys);
