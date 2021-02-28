import React, { useState, useEffect } from "react";
import styles from "../header/Header.module.css"
import { useHistory } from 'react-router-dom';
import { Button } from "../../atoms/button/Button";
import { Heading } from "../../atoms/heading/Heading";
import DeclarationPage from "../../../pages/DeclarationPage";
import AddRoommatePage from "../../../pages/AddRoomMatePage";
import DeclarationSummaryPage from "../../../pages/DeclarationSummaryPage";
import ProfilePage from "../../../pages/ProfilePage";
import HeaderProfile from "./HeaderProfile";
import HouseAccountPage from "../../../pages/HouseAccountPage";


function HeaderHouseElder(){

    const history = useHistory();


    return(
        <>
            <header className={styles.elder}>
                <Heading children="Huisoudste" level={2}></Heading>
                <Button
                    type="button"
                    onClick={() => history.push('/huisgenoten')}
                >
                    Huisgenoten
                </Button>

                <Button
                    type="button"
                    onClick={() => history.push('/huisrekening')}
                >
                    Huisrekening overzicht
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push('/declaratie/overzicht')}
                >
                    Declaraties overzicht
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push('/declaratie')}
                >
                    Boodschappen declareren
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push('/huisgenoten/toevoegen')}
                >
                    Huisgenoten toevoegen
                </Button>
                <Button
                    type="button"
                    onClick={() => history.push('/profiel')}
                >
                    Profiel
                </Button>
            </header>
        </>
    )
}

export default HeaderHouseElder;
