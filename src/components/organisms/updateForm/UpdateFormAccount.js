import React from "react";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import { FormProvider, useForm } from "react-hook-form";
import postFunction from "../../../hooks/postFunction";

function UpdateFormAccount(){
    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    function onSubmit(data){
        const account =  ({
            waterUtility: data.waterUtility,
            gasUtility: data.gasUtility,
            elektraUtility: data.elektraUtility,
            internetUtility: data.internetUtility,
        })
        postFunction(`accounts/update`, account,false);
    }


    return(
        <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                    name="accountNumber"
                    label="Account nummer:"
                />
                <TextInput
                    name="waterUtility"
                    label="Voornaam:"
                    fieldRef={register({
                        required: false,
                        pattern: {
                            value: /^\d+$/,
                            message: "Vul een getal in"
                        }
                    })}
                />
                <TextInput
                    name="gasUtility"
                    label="Achternaam:"
                    fieldRef={register({
                        required: false,
                        pattern: {
                            value: /^\d+$/,
                            message: "Vul een getal in"
                        }
                    })}
                />
                <TextInput
                    name="elektraUtility"
                    label="Username:"
                    fieldRef={register({
                        required: false,
                        pattern: {
                            value: /^\d+$/,
                            message: "Vul een getal in"
                        }
                    })}
                />
                <TextInput
                    name="internetUtility"
                    label="Email:"
                    fieldRef={register({
                        required: false,
                        pattern: {
                            value: /^\d+$/,
                            message: "Vul een getal in"
                        }
                    })}
                />
                <Button>
                    Versturen
                </Button>
            </form>
        </FormProvider>
    );
}

export default UpdateFormAccount;
