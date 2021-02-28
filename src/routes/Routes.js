import React, {  useState, useEffect } from "react";
import {Route, Switch, useHistory } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import { useAuthState } from "../context/authContext/AuthContext";
import HeaderTop from "../components/organisms/header/HeaderTop";
import ElderPage from "../pages/ElderPage";
import RoommatePage from "../pages/RoommatePage";
import {PrivateRoute} from "../components/molecules/privateRoute/PrivateRoute";
import HeaderRoomMate from "../components/organisms/header/HeaderRoomMate";




function Routes() {
    const { isAuthenticated , user } = useAuthState();
    const [page, setPage] = useState(<header>Bla</header>);

    useEffect(() => {

        if(user !== null && isAuthenticated){
            switch(user.roles) {
                case "ROLE_MODERATOR":
                    setPage(<ElderPage/>);
                    break;
                case "ROLE_USER":
                    setPage(<RoommatePage/>);
                    break;
                default:
                    setPage(<header>Bla</header>);
                    break;
            }
        }
    },[ isAuthenticated])

    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                {isAuthenticated && <Route exact path="/huisoudste">
                    <ElderPage/>
                </Route>}
                {isAuthenticated && <Route exact path="/huisgenoot">
                    <RoommatePage/>
                </Route>}
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={ SignUpPage }/>
            </Switch>
        </>
    );
}

export default Routes;
