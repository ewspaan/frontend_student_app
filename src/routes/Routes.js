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




function Routes() {
    const history = useHistory();
    const { isAuthenticated , user } = useAuthState();
    const [page, setPage] = useState("empty");

    useEffect(() => {

        if(user !== null & isAuthenticated){
            switch(user.roles) {
                case "ROLE_MODERATOR":
                    setPage("elder");
                    history.push('/huisoudste');
                    break;
                case "ROLE_USER":
                    setPage("roommate");
                    history.push('/huisgenoot');
                    break;
                default:
                    setPage("empty");
                    break;
            }
        }
    },[history, isAuthenticated, user])

    return(
        <>
            <HeaderTop/>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <PrivateRoute exact path="/huisoudste">
                    {page === "elder" ?
                        <ElderPage/> : <p>Deze pagina is alleen beschikbaar voor de huisoudste</p>
                    }
                </PrivateRoute>
                <PrivateRoute exact path="/huisgenoot">
                    {page === "roommate" ?
                        <RoommatePage/> : <p>Deze pagina is alleen beschikbaar voor de huisgenoten</p>
                    }
                </PrivateRoute>
                <Route path="/login" component={ LoginPage }/>
                <Route path="/signup" component={ SignUpPage }/>
            </Switch>
        </>
    );
}

export default Routes;
