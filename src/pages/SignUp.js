import React from 'react';
import { SignUpForm } from "../components/organisms/signUpForm/SignUpForm";
import styles from "./Page.module.css";

function SignUpPage(){




    return(

        <div className={styles.page}>
            <SignUpForm/>
        </div>
    )


}

export default SignUpPage;
