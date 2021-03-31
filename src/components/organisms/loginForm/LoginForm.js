import {TextInput} from "../../molecules/textInput/TextInput";
import {Link, useHistory} from 'react-router-dom';
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { PasswordInput } from "../../molecules/passwordInput/PasswordInput";
import { CheckboxInput } from "../../molecules/checkboxInput/CheckboxInput";
import { Button } from "../../atoms/button/Button";
import axios from "axios";
import { useAuthState } from "../../../context/authContext/AuthContext";
import {ErrorMessage} from "../../atoms/errorMessage/ErrorMessage";


export const LoginForm = () => {

    const { register, unregister, watch, getValues, handleSubmit,errors, ...methods} = useForm();

    const history = useHistory();
    const [showPassword, toggleShowPassword] = useState("text");
    const toggleClick = () => showPassword === "password" ? toggleShowPassword("text") : toggleShowPassword("password");

    // state voor gebruikersfeedback
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuthState();

    async function onSubmit(dataLogin) {
        toggleLoading(true);
        try {
            const result = await axios.post(`http://localhost:8080/api/auth/signin`, dataLogin);
            console.log("axios result--> ", result.data);
            login(result.data);
            history.push('/profiel');

        } catch (e) {
            console.error(e);
            setError("Inloggen mislukt. Username of wachtwoord verkeerd");
        }
        toggleLoading(false);
    }

    return(
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="username"
                    label="Login met Username:"
                    fieldRef={register({
                        required: {
                            value: true,
                            message: "Username is verplicht"
                        }
                    })}
                    />
                <PasswordInput
                    type={showPassword}
                    name="password"
                    label="Wachtwoord:"
                    fieldRef={register({
                        required: {
                            value: true,
                            message: "Wachtwoord is verplicht"},
                    })}
                />
                <CheckboxInput
                    name="show_password"
                    label="Toon wachtwoord"
                    onClick={toggleClick}
                />
                <Button
                    type="submit"
                    className="form-button"
                    disabled={loading}>
                    {loading === true && "Versturen..."}
                    {loading === false && "Versturen"}
                </Button>
            </form>
            {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </FormProvider>
    );
}
