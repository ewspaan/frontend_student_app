import React from 'react';
import PhotoWarande from "../assets/Homepage_Warande.jpg";
import styles from "./Page.module.css";


function HomePage(){



    return (
        <div className={styles.page}>
            <img src={PhotoWarande} alt="Foto Studentenhuis"/>
        </div>
    );

}

export default HomePage;
