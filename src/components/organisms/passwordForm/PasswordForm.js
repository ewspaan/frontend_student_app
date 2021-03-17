import React, {useState, useRef} from "react";
import styles from "./PasswordForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { CheckboxInput } from "../../molecules/checkboxInput/CheckboxInput";
import { PasswordInput } from "../../molecules/passwordInput/PasswordInput";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";
import { Button } from "../../atoms/button/Button";
import postDataFunction from "../../../hooks/postDataFunction";

function PasswordForm ({setPassword, minLengthPassword}) {
    const [showPassword, toggleShowPassword] = useState("password");
    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    const password = useRef({password: "",
                            passwordRepeat: ""});

    password.current.password = watch("password");
    password.current.passwordRepeat = watch("passwordRepeat");


    const toggleClick = () => showPassword === "password" ? toggleShowPassword("text") : toggleShowPassword("password");

    const labelString = "Wachtwoord: (wachtwoord moet minimaal "+ minLengthPassword + " symbolen lang zijn)";
    const errorMessageString = "Wachtwoord moet minimaal "+ minLengthPassword + " lang zijn";


    function onSubmit(data){
            const password = { password: data.password,
                                passwordRepeat : data.passwordRepeat};
            const result = postDataFunction("users/update", password);
            console.log("Result-passwordform-> ", result);
        }

    return (
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
            <form className={styles.passwordForm} onSubmit={handleSubmit(onSubmit)}>
                <PasswordInput
                    type={showPassword}
                    name="password"
                    label={labelString}
                    fieldRef={register({
                        required: {
                            value: true,
                            message: "Wachtwoord is verplicht"},
                        minLength: {
                            value: minLengthPassword ,
                            message: errorMessageString}
                    })}
                />
                <PasswordInput
                    type={showPassword}
                    name="passwordRepeat"
                    label="Herhaal Wachtwoord:"
                    fieldRef={register({
                        required: {
                            value: true,
                            message: "Wachtwoord is verplicht"},
                        minLength: {
                            value: minLengthPassword ,
                            message: errorMessageString}
                    })}
                />
                {password.current.password !== password.current.passwordRepeat && <ErrorMessage>Wachtwoorden komen niet overeen.</ErrorMessage>}
                <CheckboxInput
                    name="show_password"
                    label="Toon wachtwoord"
                    onClick={toggleClick}
                />
                <Button>Verander wachtwoord</Button>
            </form>
        </FormProvider>
    );

}

export default PasswordForm;

