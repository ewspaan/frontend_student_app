import React, {useEffect, useState} from 'react';
import PhotoWarande from "../assets/Homepage_Warande.jpg";
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";


function HomePage(){

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();

    return (
        <div className="page-container">
            <img src={PhotoWarande} alt="Foto Studentenhuis"/>
        </div>
    );

}

export default HomePage;
