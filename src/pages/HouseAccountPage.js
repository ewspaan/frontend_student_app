import React, { useState } from 'react';
import styles from "./HouseAccountPage.module.css"
import ProfileHouse from "../components/organisms/profile/ProfileHouse";
import HouseBill from "../components/organisms/houseBill/HouseBill";
import {Button} from "../components/atoms/button/Button";
import UpdateFormAccount from "../components/organisms/updateForm/UpdateFormAccount";
import {useAuthState} from "../context/authContext/AuthContext";
import HouseBillUser from "../components/organisms/houseBill/HouseBillUser";


function HouseAccountPage(){

    const { user } = useAuthState();


    const [update, toggleUpdate] = useState(true);


    return(
        <>
            <div className={styles.accountDiv}>
                {update ? <ProfileHouse/> : <UpdateFormAccount/>}
                {user && user.roles === "Huisoudste" &&
                <Button
                onClick={()=>toggleUpdate(!update)}>
                    {update ? "Update account" : "Terug naar Profiel"}
                </Button>}
            </div>
                {user && user.roles === "Huisoudste" ?
                    <HouseBill/> :
                    <HouseBillUser/>}
        </>
    );
}

export default HouseAccountPage;
