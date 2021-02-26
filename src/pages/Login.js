import React from 'react';
import {LoginForm} from "../components/organisms/loginForm/LoginForm";
import {useAuthState} from "../context/authContext/AuthContext";

function LoginPage(){
    const { isAuthenticated } = useAuthState();

    return(
        <div className="page-container">
            <LoginForm/>
        </div>
    )


}

export default LoginPage;
