import React, {useEffect, useState} from 'react';
import {LoginForm} from "../components/organisms/loginForm/LoginForm";
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";


function LoginPage(){

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();


    return(
        <div className="page-container">
            { isAuthenticated === false ? <LoginForm/> : <p>Je bent al ingelogd</p>}
        </div>
    )


}

export default LoginPage;
