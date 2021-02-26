import React from "react";
import { Label } from "../../atoms/label/Label";
import { ErrorMessage }  from "../../atoms/errorMessage/ErrorMessage";
import { InputField } from "../../atoms/input/InputField";
import { useFormContext } from "react-hook-form";

export const TextInput = ({label, name, fieldRef, type = "text"}) => {
    const { errors } = useFormContext();

    return (
        <div>
            <Label name={name}>{label}</Label>
            <InputField
                type={type}
                fieldRef={fieldRef}
                name={name} />
            {errors[name] && (
                <ErrorMessage>
                    {errors[name].message || "Error"}
                </ErrorMessage>
            )}
        </div>
    );

}
