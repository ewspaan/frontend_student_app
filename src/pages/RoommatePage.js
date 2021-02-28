import React, {useEffect,useState} from 'react';
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";


function RoommatePage (){
    const { isAuthenticated , user } = useAuthState();

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
