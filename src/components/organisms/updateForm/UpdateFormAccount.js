import React from "react";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import { FormProvider, useForm } from "react-hook-form";
import putFunction from "../../../hooks/putFunction";


function UpdateFormAccount(){
    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    function onSubmit(data){
        const account =  ({
            waterUtility: data.waterUtility,
            gasUtility: data.gasUtility,
            elektraUtility: data.elektraUtility,
            internetUtility: data.internetUtility,
        })
        const result = putFunction("accounts/update", account);
        console.log(result);
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
                    label="Kosten water:"
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
                    label="Kosten gas:"
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
                    label="Kosten elektra:"
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
                    label="Kosten internet:"
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
