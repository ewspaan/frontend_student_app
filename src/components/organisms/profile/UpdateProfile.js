import React, {useEffect, useState} from "react";
import {PersonInfoForm} from "../personInfoForm/PersonInfoForm";
import {PasswordForm} from "../passwordForm/PasswordForm";
import postFunction from "../../../hooks/postFunction";

function UpdateProfile(){

    const [user,setUser] = useState(null);
    const [password, setPassword] = useState(null);




    useEffect(()=> {
        if(user) {
        const client =  ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            password: user.password,
            passwordRepeat: user.passwordRepeat});
            console.log("client--> ", client);
            console.log("user-->", user);

            postFunction("users/update", client);
        }
    },[user]);
    useEffect(()=> {
        console.log("password-->", password);
        if(user) {
            postFunction("users/update", password);
        }
    },[password]);


    return(
        <>
            <PersonInfoForm setPersonalInfo={setUser}
                            firstName={true}
                            lastName={true}
                            username={false}
                            email={true}
                            dateOfBirth={true}/>
            <PasswordForm setPassword={setPassword} minLengthPassword={6}/>
        </>
    );
}

export default UpdateProfile;
