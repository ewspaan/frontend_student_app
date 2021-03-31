import React from 'react';
import styles from "../checkButton/CheckButton.module.css";
import vinkje from "../../../assets/checkmark-outline_icon-icons.com_73300.svg";


export const CheckButtonCorrect = ({ type , onClick , disabled }) =>(
        <button
            className={styles["check-button-correct"]}
            type={type}
            onClick={onClick}
            disabled={disabled}>
            <img src={vinkje}  alt="Logo" className={styles.imageCorrect}/>
        </button>
);
