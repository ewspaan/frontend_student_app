import React, { useState, useEffect } from "react";
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import HeaderHouseElder from "../components/organisms/header/HeaderHouseElder";
import HeaderRoomMate from "../components/organisms/header/HeaderRoomMate";
import DeclarationSummaryField from "../components/organisms/declarationSummaryField/DeclarationSummaryField";




function DeclarationSummaryPage () {

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();
    const [element, setElement] = useState(<header> </header>);

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
                    setElement(<header> </header>)
                    break;
            }
        }
    },[history])

    return (
        <div>
            <DeclarationSummaryField/>
        </div>
    );


}

export default DeclarationSummaryPage;
