import React from 'react';
import {LoginForm} from "../components/organisms/loginForm/LoginForm";
import {useAuthState} from "../context/authContext/AuthContext";



function LoginPage(){

    const { isAuthenticated  } = useAuthState();


    return(
        <div className="page-container">
            { isAuthenticated === false ? <LoginForm/> : <p>Je bent al ingelogd</p>}
        </div>
    )


}

export default LoginPage;
