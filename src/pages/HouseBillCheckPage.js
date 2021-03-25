import React from "react";
import styles from "./HouseAccountPage.module.css";
import ProfileHouse from "../components/organisms/profile/ProfileHouse";
import UpdateFormAccount from "../components/organisms/updateForm/UpdateFormAccount";
import {Button} from "../components/atoms/button/Button";
import HouseBill from "../components/organisms/houseBill/HouseBill";
import HouseBillUser from "../components/organisms/houseBill/HouseBillUser";

function HouseBillCheckPage(){

    return(
    <div className={styles.accountDiv}>
        <ProfileHouse/>
        <UpdateFormAccount/>
        <HouseBill/>
    </div>
    )

}

export default HouseBillCheckPage;
