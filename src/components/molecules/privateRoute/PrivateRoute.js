import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuthState } from "../../../context/authContext/AuthContext";

export const PrivateRoute = ({ children, ...rest }) => {
    const { isAuthenticated } = useAuthState();

    return (
        <Route
            {...rest} render={() =>
                isAuthenticated ? children : <Redirect to="login"/>

            }
        />
    );
};
