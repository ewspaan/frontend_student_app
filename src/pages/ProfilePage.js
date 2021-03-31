import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from "./Page.module.css";
import ProfileUser from "../components/organisms/profile/ProfileUser";
import {Button} from "../components/atoms/button/Button";

function ProfilePage(){

    const  history  = useHistory();


    return(
        <div className={styles.page}>
            <ProfileUser/>
            <Button
                onClick={() => history.push("/profiel/veranderprofiel")}
            >Edit profiel</Button>
            <Button
                onClick={() => history.push("/profiel/veranderwachtwoord")}
            >Verander wachtwoord</Button>
        </div>
    );
}


export default ProfilePage;
