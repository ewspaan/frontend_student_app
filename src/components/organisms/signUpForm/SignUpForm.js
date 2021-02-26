import React, { useState , useEffect} from "react";
import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "../../molecules/textInput/TextInput";
import { Button } from "../../atoms/button/Button";
import { CheckboxInput } from "../../molecules/checkboxInput/CheckboxInput";
import { PasswordInput } from "../../molecules/passwordInput/PasswordInput";
import axios from "axios";
import { NavLink } from "react-router-dom";


export const SignUpForm = () => {
    const { register, unregister, watch, getValues, handleSubmit,errors,setValue, ...methods} = useForm();

    const [showPassword, toggleShowPassword] = useState("password");
    const [succesFullSubmit, toggleSuccesFullSubmit] = useState(false);
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState("");
    const toggleClick = () => showPassword === "password" ? toggleShowPassword("text") : toggleShowPassword("password");

    const onSubmit = (data) => {
        toggleLoading(true);
        console.log("data--> ", data);
        const client =  ({
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            email: data.email,
            dateOfBirth: data.dateOfBirth,
            password: data.password});
        console.log("client--> ", client);

        toggleSuccesFullSubmit(false);
        setError("");
        addClient(client)
    }
    //Test data setten
    useEffect(() => {
    setValue("firstName", "Ingrid")
    setValue("lastName", "Spaan")
    setValue("username", "ipj")
    setValue("email", "ipjspaan@gmail.com")
    setValue("dateOfBirth", "06-04-1981")
    setValue("password", "12345678")
    setValue("passwordRepeat", "12345678")
    setValue("agree", true)
    },[]);



    async function addClient(dataClient) {
        //Delay om loading te testen
        setTimeout(() => {
        }, 2000);
        try {

            const result = await axios.post(`http://localhost:8080/api/auth/signup`, dataClient, null);
            console.log("axios result--> ", result);
            if (result.status === 200){
                toggleSuccesFullSubmit(true);
            }
        } catch (e) {
            if (e.message !== null) {
                setError(e.response.data.message);
            }
            console.error(e.message.data);
        }
        toggleLoading(false)
    }

  return(
      <FormProvider {...methods} register={register} watch={watch} handleSubmit={handleSubmit} errors={errors}>
          <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                  name="firstName"
                  label="Voornaam:"
                  fieldRef={register({
                      required: {
                          value: true,
                          message: "Voornaam is verplicht"
                      }
                  })}
              />
              <TextInput
                  name="lastName"
                  label="Achternaam:"
                  fieldRef={register({
                      required: {
                          value: true,
                          message: "Achternaam is verplicht"
                      }
                  })}
              />
              <TextInput
                  name="username"
                  label="Username:"
                  fieldRef={register({
                      required: {
                          value: true,
                          message: "Username is verplicht"
                      }
                  })}
              />
              <TextInput
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
              />
              <TextInput
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
              />
              <PasswordInput
                  type={showPassword}
                  name="password"
                  label="Wachtwoord:"
                  fieldRef={register({
                      required: {
                          value: true,
                          message: "Wachtwoord is verplicht"},
                      minLength: {
                          value: 8 ,
                          message: "Wachtwoord moet minimaal 8 karakters lang zijn"},
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
                          value: 8 ,
                          message: "Wachtwoord moet minimaal 8 karakters lang zijn"},
                      validate: (value) => {
                          const {password} = getValues();
                          return value === password || "Wachtwoorden zijn niet gelijk"}
                  })}
              />
              <CheckboxInput
                  name="show_password"
                  label="Toon wachtwoord"
                  onClick={toggleClick}
              />
              <CheckboxInput
                  name="agree"
                  label="Ik ga akkoord met de voorwaarden"
                  fieldRef={register({
                      required: {
                          value: true,
                          message: "Je moet akkoord gaan met de voorwaarden"
                      }
                  })}
              />
              <Button
                  disabled={loading}>
                  {loading === true && "Versturen..."}
                  {loading === false && "Versturen"}
              </Button>
          </form>

          {error !== "" && <p>{error}</p>}

          <p>{succesFullSubmit ? "Het is gelukt! Je kunt " : "Heb je al een account? Je kunt " }<NavLink to="/login">hier</NavLink> inloggen.</p>
          {/*<p>Het is gelukt! Je kunt <NavLink to="/login">hier</NavLink> inloggen.</p>*/}
      </FormProvider>
  );
};
