import React from 'react';
import styles from "../button/Button.module.css"
import {useAuthState} from "../../../context/authContext/AuthContext";

export const UserButton = ({ type , children , onClick , disabled }) => {

        const {user} = useAuthState();

        return(
            user && user.roles === "Huisgenoot" || user.roles === "Huisoudste" ?
                <button
                    className={styles["default-button"]}
                    type={type}
                    onClick={onClick}
                    disabled={disabled}>
                    {children}
                </button> : <></>
        )
}

