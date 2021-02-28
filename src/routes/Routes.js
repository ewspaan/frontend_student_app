import React, {  useState, useEffect } from "react";
import {Route, Switch, useHistory } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUp";
import { useAuthState } from "../context/authContext/AuthContext";
import HeaderTop from "../components/organisms/header/HeaderTop";
import RoommatePage from "../pages/RoommatePage";
import ProfilePage from "../pages/ProfilePage";
import DeclarationPage from "../pages/DeclarationPage";
import HouseAccountPage from "../pages/HouseAccountPage";
import RoutesModerator from "./RoutesModerator";
import DeclarationSummaryPage from "../pages/DeclarationSummaryPage";
import AddRoommatePage from "../pages/AddRoomMatePage";


function Routes() {

    const { isAuthenticated , user } = useAuthState();


    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={SignUpPage}/>
                {isAuthenticated === true ? <>
                {user.roles === "ROLE_MODERATOR" &&  <Route path="/declaratie/overzicht">
                            <DeclarationSummaryPage/>
                        </Route>}
                {user.roles === "ROLE_MODERATOR" &&  <Route path="/huisgenoten/toevoegen" >
                            <AddRoommatePage/>
                        </Route>}
                <Route path="/profiel" component={ ProfilePage }/>
                <Route exact path="/huisgenoten" component={ RoommatePage }/>
                <Route exact path="/declaratie" component={ DeclarationPage }/>
                <Route path="/huisrekening" component={ HouseAccountPage }/></> :
                    <p> Log in om deze pagina's te bekijken </p>}


            </Switch>
        </>
    );
}

export default Routes;
