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
import {PrivateRoute} from "../components/molecules/privateRoute/PrivateRoute";
import DeclarationSummaryPage from "../pages/DeclarationSummaryPage";
import AddRoommatePage from "../pages/AddRoomMatePage";


function Routes() {
    const history = useHistory();
    const [page, setPage] = useState("empty");
    const { isAuthenticated , user } = useAuthState();


    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/declaratie/overzicht" component={ DeclarationSummaryPage }/>
                <Route path="/huisgenoten/toevoegen" component={ AddRoommatePage }/>
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={SignUpPage}/>
                <Route path="/profiel" component={ ProfilePage }/>
                <Route path="/huisgenoten" component={ RoommatePage }/>
                <Route path="/declaratie" component={ DeclarationPage }/>
                <Route path="/huisrekening" component={ HouseAccountPage }/>
                </Switch>
        </>
    );
}

export default Routes;
