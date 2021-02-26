import React, { useState, useEffect } from "react";
import "../header/Header.css";
import {Route, useHistory} from 'react-router-dom';
import { Button } from "../../atoms/button/Button";
import { Heading } from "../../atoms/heading/Heading";
import DeclarationPage from "../../../pages/roommatePages/DeclarationPage";
import RoommateSignUpForm from "../roommateSignUpForm/RoommateSignUpForm";
import AddRoommatePage from "../../../pages/elderPages/AddRoomMatePage";
import LoginPage from "../../../pages/Login";
import HouseAccountSummary from "../../../pages/roommatePages/HouseAccountSummary";
import DeclarationSummaryPage from "../../../pages/elderPages/DeclarationSummaryPage";
import ProfilePage from "../../../pages/ProfilePage";
import ProfileUser from "../profile/ProfileUser";
import HeaderProfile from "./HeaderProfile";


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
                        setElement(<HouseAccountSummary/>);
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
