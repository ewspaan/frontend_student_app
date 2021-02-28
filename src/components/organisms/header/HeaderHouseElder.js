import React, { useState, useEffect } from "react";
import "../header/Header.css";
import { Button } from "../../atoms/button/Button";
import { Heading } from "../../atoms/heading/Heading";
import DeclarationPage from "../../../pages/roommatePages/DeclarationPage";
import AddRoommatePage from "../../../pages/elderPages/AddRoomMatePage";
import DeclarationSummaryPage from "../../../pages/elderPages/DeclarationSummaryPage";
import ProfilePage from "../../../pages/ProfilePage";
import HeaderProfile from "./HeaderProfile";
import HouseAccountPage from "../../../pages/elderPages/HouseAccountPage";


function HeaderHouseElder(){

    const [element, setElement] = useState();

    useEffect(()=> {
        setElement(<HeaderProfile/>);
    },[]);


    return(
        <>
            <header>
                <Heading children="Huisoudste" level={2}></Heading>
                <Button
                    type="button"
                    onClick={() => console.log("Huisgenoten")}
                >
                    Huisgenoten
                </Button>

                <Button
                    type="button"
                    onClick={() => {
                        setElement(<HouseAccountPage/>);
                    }}
                >
                    Huisrekening overzicht
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setElement(<DeclarationSummaryPage/>);
                    }}
                >
                    Declaraties overzicht
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setElement(<DeclarationPage/>);
                        }}
                >
                    Boodschappen declareren
                </Button>
                <Button
                    type="button"
                    onClick={() => setElement(<AddRoommatePage/>)}
                >
                    Huisgenoten toevoegen
                </Button>
                <Button
                    type="button"
                    onClick={() => {
                        setElement(<ProfilePage/>);
                    }}
                >
                    Profiel
                </Button>
            </header>
            {element}
        </>
    )
}

export default HeaderHouseElder;
