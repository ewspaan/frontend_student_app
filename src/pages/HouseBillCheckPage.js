import React from "react";
import styles from "./Page.module.css";
import UpdateFormAccount from "../components/organisms/updateForm/UpdateFormAccount";
import HouseBill from "../components/organisms/houseBill/HouseBill";

function HouseBillCheckPage(){

    return(
    <div className={styles.page}>
        <UpdateFormAccount/>
        <HouseBill/>
    </div>
    )

}

export default HouseBillCheckPage;
