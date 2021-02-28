import React from "react";
import styles from "./Profile.module.css";
import {useAuthState} from "../../../context/authContext/AuthContext";

function ProfileUser(){

    const {  user } = useAuthState();

    return(
        <>
            {user && <div className={styles.profile}>
                <p>{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.dateOfBirth}</p>
                <p>{user.roles}</p>
                <p>{user.houseName}</p>
            </div>}
        </>
    );
}

export default ProfileUser;
