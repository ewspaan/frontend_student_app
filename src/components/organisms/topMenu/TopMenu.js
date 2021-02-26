import React, {useContext, useEffect, useState} from "react";
import "./TopMenu.css";
import HeaderTop from "../header/Header";
import { AuthContext, useAuthState } from "../../../context/authContext/AuthContext";
import HeaderHouseElder from "../header/HeaderHouseElder";
import HeaderRoomMate from "../header/HeaderRoomMate";




function TopMenu() {
    const [elderOrNot, toggleElderOrNot] = useState(null);
    const [roomMateOrNot, toggleRoomMateOrNot] = useState(false);
    const { isAuthenticated } = useAuthState();
    const authState = useContext(AuthContext);
    // useEffect(() => {
    //     function RoomMateOrElder() {
    //         if (authState.user.roles !== null) {
    //             const role = authState.user.roles[0];
    //             if (role === "ROLE_MODERATOR") {
    //                 toggleElderOrNot(true);
    //
    //             }
    //             if (role === "ROLE_USER") {
    //                 toggleRoomMateOrNot(true);
    //
    //             }
    //         }
    //     }
    //     RoomMateOrElder();
    // },[isAuthenticated]);
    console.log("user", authState.user.roles);



    return (
        <>
            <HeaderTop/>
            {isAuthenticated && elderOrNot && <HeaderHouseElder/>}
            {isAuthenticated && roomMateOrNot && <HeaderRoomMate/>}
        </>
    );
}

export default TopMenu;
