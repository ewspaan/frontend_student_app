import React, { useState } from "react";
import styles from "./PersonInfoForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import postDataFunction from "../../../hooks/postDataFunction";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {ErrorMessage} from "../../atoms/errorMessage/ErrorMessage";
import {useHistory} from "react-router-dom";



function PersonInfoForm() {

    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();
    const { setUserAndHouse } = useAuthState();
    const history = useHistory();
    const [error, setError] = useState("");

    async function onSubmit(data) {

        const client = ({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            password: data.password,
            passwordRepeat: data.passwordRepeat
        });

        const result = await postDataFunction("users/update", client);

        console.log("client--> ", result);
        if(result.status === 200){
            setUserAndHouse();
            history.push("/profiel");
            setError("");
        }else {
            setError(result.data.message);
        }

    }

    return (
        <div className={styles.infoForm}>
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                        name="firstName"
                        label="Voornaam:"
                        fieldRef={register({
                            required: false
                        })}
                    />
                    <TextInput
                        name="lastName"
                        label="Achternaam:"
                        fieldRef={register({
                            required: false
                        })}
                    />
                    <TextInput
                        name="email"
                        label="Email:"
                        fieldRef={register({
                            required: false,
                            pattern: {
                                value: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Vul een geldig e-mailadres in."
                            }
                        })}
                    />
                    <TextInput
                        name="dateOfBirth"
                        label="Geboortedatum: (DD-MM-JJJJ)"
                        fieldRef={register({
                            required: false,
                            pattern: {
                                value: /^(29-02-(2000|(19|20(0[48]|[2468][048]|[13579][26]))))$|^((0[1-9]|1[0-9]|2[0-8])-02-((19|20)[0-9]{2}))$|^((0[1-9]|[12][0-9]|3[01])-(0[13578]|10|12)-((19|20)[0-9]{2}))$|^((0[1-9]|[12][0-9]|30)-(0[469]|11)-((19|20)[0-9]{2}))$/,
                                message: "Datum is onjuist"
                            },
                        })}
                    />
                    <Button>
                        Versturen
                    </Button>
                </form>
                {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
            </FormProvider>
        </div>
    );
}

export default PersonInfoForm;

