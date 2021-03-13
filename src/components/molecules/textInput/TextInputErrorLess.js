import React from "react";
import { Label } from "../../atoms/label/Label";
import { InputField } from "../../atoms/input/InputField";


export const TextInputErrorLess = ({label, name, type}) => {


    return (
        <div>
            <Label name={name}>{label}</Label>
            <InputField
                type={type}
                name={name}
            />
        </div>
    );

}
