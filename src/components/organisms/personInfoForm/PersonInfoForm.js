import React from "react";
import styles from "./PersonInfoForm.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import postFunction from "../../../hooks/postFunction";



function PersonInfoForm({firstName,lastName,username,email,dateOfBirth}) {

    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();


    function onSubmit(data) {

        const client = ({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            password: data.password,
            passwordRepeat: data.passwordRepeat
        });
        console.log("client--> ", client);
        postFunction("users/update", client , false);
    }

    return (
            <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
                <form className={styles.infoForm} onSubmit={handleSubmit(onSubmit)}>
                    {firstName === true && <TextInput
                        name="firstName"
                        label="Voornaam:"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: "Voornaam is verplicht"
                            }
                        })}
                    />}
                    {lastName === true && <TextInput
                        name="lastName"
                        label="Achternaam:"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: "Achternaam is verplicht"
                            }
                        })}
                    />}
                    {username === true &&<TextInput
                        name="username"
                        label="Username:"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: "Username is verplicht"
                            }
                        })}
                    />}
                    {email === true && <TextInput
                        name="email"
                        label="Email:"
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
                    />}
                    {dateOfBirth == true && <TextInput
                        name="dateOfBirth"
                        label="Geboortedatum: (DD-MM-JJJJ)"
                        fieldRef={register({
                            required: {
                                value: true,
                                message: "Geboortedatum is verplicht"
                            },
                            pattern: {
                                value: /^(29-02-(2000|(19|20(0[48]|[2468][048]|[13579][26]))))$|^((0[1-9]|1[0-9]|2[0-8])-02-((19|20)[0-9]{2}))$|^((0[1-9]|[12][0-9]|3[01])-(0[13578]|10|12)-((19|20)[0-9]{2}))$|^((0[1-9]|[12][0-9]|30)-(0[469]|11)-((19|20)[0-9]{2}))$/,
                                message: "Datum is onjuist"
                            },
                        })}
                    />}
                    <Button>
                        Versturen
                    </Button>
                </form>
            </FormProvider>
    );
}

export default PersonInfoForm;

