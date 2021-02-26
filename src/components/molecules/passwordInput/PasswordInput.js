import React from "react";
import { Label } from "../../atoms/label/Label";
import { ErrorMessage }  from "../../atoms/errorMessage/ErrorMessage";
import { InputField } from "../../atoms/input/InputField"
import { useFormContext } from "react-hook-form";


export const PasswordInput = ({label,name,fieldRef,type,onChange}) => {
    const { errors } = useFormContext();

    return (
        <div>
                <Label name={name}>{label}</Label>
                <InputField
                    type={type}
                    name={name}
                    fieldRef={fieldRef}
                    onChange={onChange}
                />
                {errors[name] && (
                    <ErrorMessage>
                        {errors[name].message || "Error"}
                    </ErrorMessage>
                )}
            </div>
    );

}