import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Button } from "../../atoms/button/Button";
import { Heading } from "../../atoms/heading/Heading";
import DeclarationPage from "../../../pages/DeclarationPage";
import ProfilePage from "../../../pages/ProfilePage";
import HeaderProfile from "./HeaderProfile";
import HouseAccountPage from "../../../pages/HouseAccountPage";


function HeaderRoomMate(){

    const history = useHistory();


    return(
        <>
            <header>
                <Heading children="Huisgenoot" level={2}></Heading>
                <Button
                    type="button"
                    onClick={() => history.push('/profiel')}
                >
                    Profiel
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push("/declaratie")}
                >
                    Boodschappen declareren
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push("/huisrekening")}
                >
                    Huisrekening overzicht
                </Button>
            </header>
        </>
    )
}

export default HeaderRoomMate;
