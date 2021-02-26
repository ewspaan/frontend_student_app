import React from 'react';
import {Heading} from "../../components/atoms/heading/Heading";
import RoommateSignUpForm from "../../components/organisms/roommateSignUpForm/RoommateSignUpForm";

function AddRoommatePage(){

    return(
        <>
            <Heading level={1}>Aanmelden huisgenoten:</Heading>
            <RoommateSignUpForm/>
        </>
    );
}

export default AddRoommatePage
