import React from "react";
import {useAuthState} from "../../../context/authContext/AuthContext";

function ProfileHouse(){

    const { house } = useAuthState();

    return(
        <>
            {house !==null &&
            <div>
                <p>Accountnummer:   {house.accountNumber}</p>
                <p>Kosten elektra:  {house.elektraUtility}</p>
                <p>Kosten water:    {house.waterUtility}</p>
                <p>Kosten gas:      {house.gasUtility}</p>
                <p>Kosten internet  {house.internetUtility}</p>
            </div>
            }
        </>
    );
};

export default ProfileHouse;
