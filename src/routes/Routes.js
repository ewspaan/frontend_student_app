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
import DeclarationCheckPage from "../pages/DeclarationCheckPage";
import HouseBillCheckPage from "../pages/HouseBillCheckPage";


function Routes() {



    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={ HomePage } />
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={ SignUpPage }/>

                <RoommateRoute exact path="/declaratie">
                    <DeclarationPage/>
                </RoommateRoute>
                <RoommateRoute path="/declaratie/overzicht">
                    <DeclarationSummaryPage/>
                </RoommateRoute>
                <RoommateRoute exact path="/huisgenoten" >
                    <RoommatePage/>
                </RoommateRoute>
                <RoommateRoute path="/profiel">
                    <ProfilePage/>
                </RoommateRoute>
                <RoommateRoute exact path="/huisrekening/overzicht">
                    <HouseAccountPage/>
                </RoommateRoute>

                <ElderRoute path="/declaratie/keuren">
                    <DeclarationCheckPage/>
                </ElderRoute>
                <ElderRoute path="/huisgenoten/toevoegen" >
                    <AddRoommatePage/>
                </ElderRoute>
                <ElderRoute path="/huisrekening/keuren">
                    <HouseBillCheckPage/>
                </ElderRoute>
            </Switch>
        </>
    );
}

export default Routes;
