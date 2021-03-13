import React from "react";
import { Route } from "react-router-dom";
import { useAuthState } from "../context/authContext/AuthContext";


function ElderRoute({children, ...rest}) {

    const { isAuthenticated , user } = useAuthState();



    return(
        <Route {...rest}
            render={() =>
                user && user.roles === "Huisoudste" ? (children)
                    :
                    (<p>Je moet huisoudste zijn om deze pagina te zien</p>)
            }
    />)
}

export default ElderRoute;
