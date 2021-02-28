import React, { useState, useEffect } from "react";
import "./DeclarationPage.css";
import "./DeclarationPage.css"
import {useAuthState} from "../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import DeclarationForm from "../components/organisms/declarationForm/DeclarationForm";

function DeclarationPage(){

    const { isAuthenticated , user } = useAuthState();
    const history = useHistory();

    return (
        <div>
            <DeclarationForm/>
        </div>
    );
}

export default DeclarationPage;
