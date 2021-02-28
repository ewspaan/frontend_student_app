import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../../atoms/button/Button";
import { TextInput } from "../../molecules/textInput/TextInput";
import axios from "axios";

function RoommateSignUpForm(){

    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    const [succesFullSubmit, toggleSuccesFullSubmit] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");


    //test data setten
    useEffect(() => {
        setValue("firstName", "Blabla")
        setValue("lastName", "van Bla")
        setValue("email", "hmmmmm@gmail.com")
    },[]);


    async function addClient(dataClient) {

        toggleLoading(true);
        const token = localStorage.getItem('token');
        const data = {  firstName: dataClient.firstName,
                        lastName: dataClient.lastName,
                        email: dataClient.email}
        console.log("dataClient-->  ", data)
        try {

            const result = await axios.post(`http://localhost:8080/api/users/roommate`,
                                                data ,
                                            {headers: {
                                                "Content-Type": "application/json",
                                                Authorization: `Bearer ${token}`
                                                }}
            );
            console.log("axios result--> ", result);
            if (result.status === 200){
                toggleSuccesFullSubmit(true);
            }
        } catch (e) {
            if (e.message !== null) {
                setError(e.response.data.message);
            }
            toggleLoading(false);
            console.error(e);
        }
        toggleSuccesFullSubmit(false);
        setError("");
        toggleLoading(false);
    }


    const onSubmit = (data) => {
        addClient(data);
    }

    return(
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
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
                </form>
            </FormProvider>
    );
}

export default RoommateSignUpForm;
