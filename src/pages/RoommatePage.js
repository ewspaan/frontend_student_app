import React, {useEffect,useState} from 'react';
import HeaderRoomMate from "../components/organisms/header/HeaderRoomMate";
import HeaderHouseElder from "../components/organisms/header/HeaderHouseElder";
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";


function RoommatePage (){
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

    return(
        <>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
            <p>Blabla</p>
        </>
    );
};

export default RoommatePage;
