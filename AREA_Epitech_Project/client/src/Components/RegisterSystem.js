import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterSystem.css'
import bgImg from './stonks-meme.jpg';
import {useCookies, withCookies } from 'react-cookie'


function Register() {

    const [cookies, setCookie] = useCookies(["user"]);

    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/service');
    };

    const [usernameReg, setUsernameReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [registerStatus, setRegisterStatus] = useState('')
    const register = () => {
        if (usernameReg.length > 0 && passwordReg.length > 0)
            axios.post('http://localhost:8080/register', {
                username: usernameReg,
                password: passwordReg,
            }).then((response) => {
                console.log(response)
                if (response.data.error) {
                    setRegisterStatus(response.data.error)
                } else {
                    setCookie("user", usernameReg, { path: "/" });
                    navigateHome()
                }
            })
    }
    return (
        <div className="App">
            <div className="registration">
                <h1>REGISTER</h1>
                <label>Username</label>
                <div className="wrapper">
                    <div className="icon_1"></div>
                    <input type="text" placeholder="Username..." onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }} />
                </div>
                <label>Password</label>
                <div className="wrapper">
                    <div className="icon_2"></div>
                    <input type="password" placeholder="Password..." onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }} />
                </div>
                {passwordReg.length >= 3 ? "" : <div className="text-danger m-3 ">password is too short</div>}
                <div className="text-danger m-1 ">{registerStatus}</div>
                <button className='btn' onClick={register}>Create account</button>
            </div>
            <div className="col-2">
                <img src={bgImg} alt="" />
            </div>
        </div>
    )
}

export default withCookies(Register);