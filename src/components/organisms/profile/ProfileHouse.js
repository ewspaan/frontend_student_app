import React from "react";
import {useAuthState} from "../../../context/authContext/AuthContext";
import styles from "./Profile.module.css";
import {Heading} from "../../atoms/heading/Heading";

function ProfileHouse(){

    const { house } = useAuthState();

    return(
        <div className={styles.profile}>
            <Heading level={1} children={"Overzicht vaste lasten:" }/>
            {house !==null &&
            <ul>
                <li><p>Accountnummer:</p><p>{house.accountNumber}</p></li>
                <li><p>Kosten elektra:</p><p>&euro; {house.elektraUtility}</p></li>
                <li><p>Kosten water:</p><p>&euro; {house.waterUtility}</p></li>
                <li><p>Kosten gas:</p><p>&euro; {house.gasUtility}</p></li>
                <li><p>Kosten internet</p><p>&euro; {house.internetUtility}</p></li>
            </ul>
            }
        </div>
    );
}

export default ProfileHouse;
