import React, { createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const register = (name, password) => {
        axios.post('http://localhost:8080/register', {
            name, password
        })
        .then(res => {
            console.log("Registered successfully");
        })
        .catch(e => {
            console.log(`Register error ${e}`);
        })
    }

    return (
        <AuthContext.Provider value={{register}}>
            {children}
        </AuthContext.Provider>
    )
}