import React from 'react';
import { useParams } from "react-router-dom";
import {SignUpFormAdd} from "../components/organisms/signUpForm/SignUpFormAdd";
import styles from "./Page.module.css";



function RoommateAddPage() {
    const {firstName,lastName,email, houseId} = useParams();

    return (
        <div className={styles.page}>
            <SignUpFormAdd housemate={{firstName,lastName,email, houseId}}/>
        </div>
    );
}

export default RoommateAddPage;
