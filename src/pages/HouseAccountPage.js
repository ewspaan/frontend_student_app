import React, { useState } from 'react';
import styles from "./HouseAccountPage.module.css"
import ProfileHouse from "../components/organisms/profile/ProfileHouse";
import HouseBill from "../components/organisms/houseBill/HouseBill";
import {Button} from "../components/atoms/button/Button";
import UpdateFormAccount from "../components/organisms/updateForm/UpdateFormAccount";
import {useAuthState} from "../context/authContext/AuthContext";


function HouseAccountPage(){

    const { user } = useAuthState();


    const [update, toggleUpdate] = useState(true);


    return(
        <div className={styles.accountdiv}>
            {update ? <ProfileHouse/> : <UpdateFormAccount/>}
            {user && user.roles === "Huisoudste" &&
            <Button
            onClick={()=>toggleUpdate(!update)}>
                {update ? "Update account" : "Terug naar Profiel"}
            </Button>}
            <HouseBill/>
        </div>
    );
}

export default HouseAccountPage;
