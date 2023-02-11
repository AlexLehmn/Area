import React from 'react';
import Navigation from '../Components/Navbar';
import RegisterSys from '../Components/RegisterSystem'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const Register = () => {
    return (
        <div>
            <Navigation />
            <RegisterSys/>
        </div>
    );
};

export default Register;