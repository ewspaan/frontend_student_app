import React from 'react';
import styles from "./Page.module.css";
import HouseBillUser from "../components/organisms/houseBill/HouseBillUser";
import ProfileHouse from "../components/organisms/profile/ProfileHouse";


function HouseAccountPage(){




    return(

            <div className={styles.page}>
                <ProfileHouse/>
                <HouseBillUser/>
            </div>

    );
}

export default HouseAccountPage;
