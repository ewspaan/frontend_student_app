import React from "react";
import styles from "./InputField.module.css"

export const InputField = ({ type, fieldRef, id, name , value, onClick, onChange, key, accept }) => {


    return(
    <input
        className={styles.inputField}
        type={type}
        ref={fieldRef}
        name={name}
        id={id || name}
        value={value}
        onClick={onClick}
        onChange={onChange}
        key={key}
        accept={accept}
    />
);
}
