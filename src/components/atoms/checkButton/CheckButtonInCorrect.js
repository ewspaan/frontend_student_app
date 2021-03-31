import React from "react";
import styles from "./CheckButton.module.css";
import cross from "../../../assets/cross-mark-svgrepo-com.svg";


export const CheckButtonInCorrect = ({ type , onClick , disabled }) =>(
    <button
        className={styles["check-button-incorrect"]}
        type={type}
        onClick={onClick}
        disabled={disabled}>
        <img src={cross}  alt="Logo" className={styles.imageInCorrect}/>
    </button>
);
