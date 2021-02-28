import React, { useState, useEffect } from 'react';
import ProfileUser from "../components/organisms/profile/ProfileUser";
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import HeaderHouseElder from "../components/organisms/header/HeaderHouseElder";
import HeaderRoomMate from "../components/organisms/header/HeaderRoomMate";
import PersonInfoForm from "../components/organisms/personInfoForm/PersonInfoForm";
import {PasswordForm} from "../components/organisms/passwordForm/PasswordForm";

function ProfilePage(){

    const [data, setData] = useState();

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();
    const [element, setElement] = useState(<header>Leeg</header>);

    useEffect(() => {

        if(user !== null && isAuthenticated){
            switch(user.roles) {
                case "ROLE_MODERATOR":
                    setElement(<HeaderHouseElder/>)
                    break;
                case "ROLE_USER":
                    setElement(<HeaderRoomMate/>)
                    break;
                default:
                    setElement(<header>Bla</header>)
                    break;
            }
        }
    },[history])

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
