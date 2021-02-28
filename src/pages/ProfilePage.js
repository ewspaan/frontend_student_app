import React, { useState, useEffect } from 'react';
import ProfileUser from "../components/organisms/profile/ProfileUser";
import {useAuthState} from "../context/authContext/AuthContext";
import PersonInfoForm from "../components/organisms/personInfoForm/PersonInfoForm";
import {PasswordForm} from "../components/organisms/passwordForm/PasswordForm";

function ProfilePage(){

    const [data, setData] = useState();

    const { isAuthenticated , user } = useAuthState();

    return(
        <>
            <ProfileUser/>
            <PersonInfoForm
                firstName={true}
                lastName={true}
                username={false}
                email={true}
                dateOfBirth={true}/>
            <PasswordForm minLengthPassword={6}/>
        </>
    );
}


export default ProfilePage;
