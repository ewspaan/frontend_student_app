import React, { useState } from "react";
import styles from "./Update.module.css";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import { FormProvider, useForm } from "react-hook-form";
import putFunction from "../../../hooks/putFunction";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {Heading} from "../../atoms/heading/Heading";


function UpdateFormAccount(){
    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();
    const { setUserAndHouse } = useAuthState();
    const [succes, toggleSucces] = useState(false);

    async function onSubmit(data){
        const account =  ({
            accountNumber: data.accountNumber,
            waterUtility: data.waterUtility,
            gasUtility: data.gasUtility,
            elektraUtility: data.elektraUtility,
            internetUtility: data.internetUtility,
        })
        const result = await putFunction("accounts/update", account);
        if(result.status !== null && result.status === 200) {
            setUserAndHouse();
            toggleSucces(true);
        }
        console.log("update--> ", result);
    }


    return(
        <div className={styles.update}>
            <Heading level={1} children={"Verander vaste lasten"}/>
            {succes ? <p onClick={() =>toggleSucces(false)}>Account succesvol verandert. Klik hier om terug te keren</p> :

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
            </FormProvider>}
        </div>
    );
}

export default UpdateFormAccount;
