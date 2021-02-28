import React, { useState, useEffect } from "react";
import "../header/Header.css";
import { Button } from "../../atoms/button/Button";
import { Heading } from "../../atoms/heading/Heading";
import DeclarationPage from "../../../pages/roommatePages/DeclarationPage";
import ProfilePage from "../../../pages/ProfilePage";
import HeaderProfile from "./HeaderProfile";
import HouseAccountPage from "../../../pages/elderPages/HouseAccountPage";


function HeaderRoomMate(){


    const [element, setElement] = useState();

    useEffect(()=> {
        setElement(<HeaderProfile/>);
    },[]);


    return(
        <>
            <header>
                <Heading children="Huisgenoot" level={2}></Heading>
                <Button
                    type="button"
                    onClick={() => {
                        setElement(<ProfilePage/>);
                    }}
                >
                    Profiel
                </Button>
                <Button
                    type="button"
                    onClick={() => setElement(<DeclarationPage/>)}
                >
                    Boodschappen declareren
                </Button>
                <Button
                    type="button"
                    onClick={() => setElement(<HouseAccountPage/>)}
                >
                    Huisrekening overzicht
                </Button>
            </header>
            {element}
        </>
    )
}

export default HeaderRoomMate;
