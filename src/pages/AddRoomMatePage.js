import React from 'react';
import RoommateSignUpForm from "../components/organisms/signUpForm/RoommateSignUpForm";
import styles from "./Page.module.css";

function AddRoommatePage(){


    return (
        <div className={styles.page}>
            <RoommateSignUpForm/>
        </div>
    );
};

export default AddRoommatePage
