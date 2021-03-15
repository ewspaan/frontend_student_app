import React from 'react';
import styles from"../Logo/Logo.module.css"
import logo  from "../../../assets/logo3.svg";


export const Logo = () => (

      <img src={logo}  alt="Logo" className={styles.logo}/>
    );


