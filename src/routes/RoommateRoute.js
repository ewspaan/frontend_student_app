import React from "react";
import { Route } from "react-router-dom";
import { useAuthState } from "../context/authContext/AuthContext";


function RoommateRoute({children, ...rest}) {

    const { isAuthenticated } = useAuthState();



    return(
        <Route {...rest}
               render={() =>
                   isAuthenticated ? (children)
                       :
                       (<p>Je moet ingelogd zijn om deze pagina te zien</p>)
               }
        />)
}

export default RoommateRoute;
