import React from "react";
import "../input/InputField.css"

export const InputField = ({ type, fieldRef, id, name , value, onClick, onChange, key, accept }) => {


    return(
    <input
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
