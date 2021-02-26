import React from "react";
import {TextInput} from "../../molecules/textInput/TextInput";
import {FormProvider, useForm} from "react-hook-form";


function RoommateSignUpInput({count}){

    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();


    return (

            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
        <TextInput
            type="text"
            fieldRef={register({
                required: false})}
            label="Voornaam:"
            name={"firstName_"+count}/>
        <TextInput
            type="text"
            fieldRef={register({
                required: false})}
            label="Achternaam:"
            name={"lastName_"+count}/>
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
            name={"email_"+count}/>
            </FormProvider>

    )
}

export default RoommateSignUpInput;
