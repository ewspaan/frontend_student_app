import React, { useState, useEffect } from "react";
import "./DeclarationPage.css";
import "./DeclarationPage.css"
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import HeaderHouseElder from "../components/organisms/header/HeaderHouseElder";
import HeaderRoomMate from "../components/organisms/header/HeaderRoomMate";
import DeclarationForm from "../components/organisms/declarationForm/DeclarationForm";

function DeclarationPage(){

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();
    const [element, setElement] = useState(<header></header>);

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
                    setElement(<header></header>)
                    break;
            }
        }
    },[history])

    return (
        <div>
            <DeclarationForm/>
        </div>
    );
}

export default DeclarationPage;
