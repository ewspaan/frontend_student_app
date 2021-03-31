import React, { useState } from "react";
import styles from "./SignUpForm.module.css"
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { TextInput } from "../../molecules/textInput/TextInput";
import postDataFunction from "../../../hooks/postDataFunction";
import {ErrorMessage} from "../../atoms/errorMessage/ErrorMessage";

function RoommateSignUpForm(){

    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    const [succes, toggleSucces] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");



    async function onSubmit(dataClient) {

        toggleLoading(true);
        const data = {  firstName: dataClient.firstName,
                        lastName: dataClient.lastName,
                        email: dataClient.email}
        console.log("dataClient-->  ", data)
        const result = await postDataFunction("users/roommate",data)
        console.log("axios result--> ", result);
            if (result.status === 200){
                toggleSucces(true);
                setMessage(result.data.message);
                setError("");
            }else{
                await setError(result.data.message);
            }
        toggleLoading(false);
    }


    return(
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
                {succes ? <p className={styles.succesP} onClick={() =>toggleSucces(false)}>{message}. Klik hier om terug te keren</p> :
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        type="text"
                        fieldRef={register({
                            required: false})}
                        label="Voornaam:"
                        name={"firstName"}/>
                    <TextInput
                        type="text"
                        fieldRef={register({
                            required: false})}
                        label="Achternaam:"
                        name={"lastName"}/>
                    <TextInput
                        type="text"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: "E-mailadres is verplicht"
                            },
                            pattern: {
                                value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Vul een geldig e-mailadres in."
                            }
                        })}
                        label="Email:"
                        name={"email"}/>
                    <Button
                        disabled={loading}>
                        {loading === true && "Versturen..."}
                        {loading === false && "Versturen"}
                    </Button>
                </form>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </FormProvider>
    );
}

export default RoommateSignUpForm;
