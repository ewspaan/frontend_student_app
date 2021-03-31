import React from 'react';
import {LoginForm} from "../components/organisms/loginForm/LoginForm";
import {useAuthState} from "../context/authContext/AuthContext";
import styles from "./Page.module.css";


function LoginPage(){

    const { isAuthenticated  } = useAuthState();


    return(
        <div className={styles.page}>
            { isAuthenticated === false ? <LoginForm/> : <p>Je bent al ingelogd</p>}
        </div>
    )


}

export default LoginPage;
