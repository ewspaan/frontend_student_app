import React from "react";
import styles from "./Profile.module.css";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {Heading} from "../../atoms/heading/Heading";


function ProfileUser(){

    const {  user, house } = useAuthState();


    return(
        <div  className={styles.profile}>
            <Heading level={2} children={"Profiel:"}/>
            {user && house &&
            <ul>
                <li><p>Naam:</p><p>{user.firstName} {user.lastName}</p></li>
                <li><p>Email:</p><p>{user.email}</p></li>
                <li><p>Geboortedatum:</p><p>{user.dateOfBirth}</p></li>
                <li><p>Huisrol:</p><p>{user.roles}</p></li>
                <li><p>Naam huis:</p><p>{house.houseName}</p></li>
            </ul>}
        </div>
    );
}

export default ProfileUser;
