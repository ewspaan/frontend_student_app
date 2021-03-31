import React from 'react';
import RoommateSummary from "../components/organisms/RoommateSummary/RoommateSummary";
import styles from "./Page.module.css";

function RoommatePage (){

    return (
        <div className={styles.page}>
            <RoommateSummary/>
        </div>
    );
}

export default RoommatePage;
