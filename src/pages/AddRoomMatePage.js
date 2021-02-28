import React from 'react';
import RoommateSignUpForm from "../components/organisms/roommateSignUpForm/RoommateSignUpForm";
import {useAuthState} from "../context/authContext/AuthContext";


function AddRoommatePage(){


    return (
        <div>
            <RoommateSignUpForm/>
        </div>
    );
};

export default AddRoommatePage
