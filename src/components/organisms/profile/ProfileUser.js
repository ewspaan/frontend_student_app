import React, { useState, useEffect } from "react";
import getFunction from "../../../hooks/getFunction";
import {useHistory} from "react-router-dom";
import {useAuthState} from "../../../context/authContext/AuthContext";

function ProfileUser(){

    const {  user } = useAuthState();



    return(
        <>
            {user && <div>
                <p>{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.dateOfBirth}</p>
                <p>{user.roles}</p>
                <p>{user.houseName}</p>
            </div>}
        </>
    );
}

export default ProfileUser;
