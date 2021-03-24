import React from "react";
import DeclarationSummaryField from "../components/organisms/declarationSummaryField/DeclarationSummaryField";
import DeclarationSummaryFieldUser from "../components/organisms/declarationSummaryField/DeclarationSummaryFieldUser";
import {useAuthState} from "../context/authContext/AuthContext";




function DeclarationSummaryPage () {

    const { user } = useAuthState();


    return (
        <div>
            {user && user.roles === "Huisoudste" && <DeclarationSummaryField/>}
            {user && user.roles === "Huisgenoot" && <DeclarationSummaryFieldUser/>}
        </div>
    );


}

export default DeclarationSummaryPage;
