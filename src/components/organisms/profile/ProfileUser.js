import React, { useState, useEffect } from "react";
import getFunction from "../../../hooks/getFunction";

function ProfileUser(){

    const [user,setUser] = useState(null);

    async function getProfile() {

        try{
            const result = await getFunction(`users/download/`);
            console.log("profile-->" , result);
            setUser(result)
        } catch (e) {
            console.error(e.message);
        }
    }

    useEffect(()=> {
        getProfile();
    },[]);

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
