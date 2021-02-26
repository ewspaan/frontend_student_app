import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputField } from "../../atoms/input/InputField";
import { Label } from "../../atoms/label/Label";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";


export const CheckboxInput = ({ label, name, fieldRef, value, onClick }) => {
    const { errors } = useFormContext();

    return(
        <div>
            <InputField type="checkbox" fieldRef={fieldRef} name={name} value={value} onClick={onClick} />
            <Label name={name}>{label}</Label>
            {errors[name] && (
                <ErrorMessage>{errors[name].message || "Error"}</ErrorMessage>
            )}
        </div>
    );
};