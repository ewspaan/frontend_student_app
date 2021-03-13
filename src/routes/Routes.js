import React from "react";
import {Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUp";
import HeaderTop from "../components/organisms/header/HeaderTop";
import RoommatePage from "../pages/RoommatePage";
import ProfilePage from "../pages/ProfilePage";
import DeclarationPage from "../pages/DeclarationPage";
import HouseAccountPage from "../pages/HouseAccountPage";
import DeclarationSummaryPage from "../pages/DeclarationSummaryPage";
import AddRoommatePage from "../pages/AddRoomMatePage";
import ElderRoute from "./ElderRoute";
import RoommateRoute from "./RoommateRoute";


function Routes() {



    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={ SignUpPage }/>
                <ElderRoute path="/declaratie/overzicht">
                    <DeclarationSummaryPage/>
                </ElderRoute>
                <ElderRoute path="/huisgenoten/toevoegen" >
                    <AddRoommatePage/>
                </ElderRoute>
                <RoommateRoute path="/profiel">
                    <ProfilePage/>
                </RoommateRoute>
                <RoommateRoute exact path="/huisgenoten" >
                    <RoommatePage/>
                </RoommateRoute>
                <RoommateRoute exact path="/declaratie">
                    <DeclarationPage/>
                </RoommateRoute>
                <RoommateRoute path="/huisrekening">
                    <HouseAccountPage/>
                </RoommateRoute>
            </Switch>
        </>
    );
}

export default Routes;
