import React, { useState, useEffect } from "react";
import {useAuthState} from "../context/authContext/AuthContext";
import DeclarationSummaryField from "../components/organisms/declarationSummaryField/DeclarationSummaryField";




function DeclarationSummaryPage () {

    const { isAuthenticated , user } = useAuthState();

    return (
        <div>
            <DeclarationSummaryField/>
        </div>
    );


}

export default DeclarationSummaryPage;
