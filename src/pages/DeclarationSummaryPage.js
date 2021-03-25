import React from "react";
import DeclarationSummaryField from "../components/organisms/declarationSummaryField/DeclarationSummaryField";
import DeclarationSummaryFieldUser from "../components/organisms/declarationSummaryField/DeclarationSummaryFieldUser";
import {useAuthState} from "../context/authContext/AuthContext";




function DeclarationSummaryPage () {




    return (
        <div>
            <DeclarationSummaryFieldUser/>
        </div>
    );


}

export default DeclarationSummaryPage;
