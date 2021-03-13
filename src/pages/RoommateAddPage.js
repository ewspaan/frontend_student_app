import React from 'react';
import { useParams } from "react-router-dom";
import {SignUpFormAdd} from "../components/organisms/signUpForm/SignUpFormAdd";



function RoommateAddPage() {
    const {firstName,lastName,email, houseId} = useParams();

    return (
            <SignUpFormAdd housemate={{firstName,lastName,email, houseId}}/>
    );
}

export default RoommateAddPage;
