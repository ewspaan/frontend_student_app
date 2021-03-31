import React, {useEffect, useState} from 'react';
import { Heading } from "../../atoms/heading/Heading";
import { Button } from "../../atoms/button/Button";
import getFunction from "../../../hooks/getFunction";
import { useAuthState } from "../../../context/authContext/AuthContext";
import deleteFunction from "../../../hooks/deleteFunction";
import { NavLink } from "react-router-dom";
import styles from "./RoommateSummary.module.css"
import {CheckButtonCorrect} from "../../atoms/checkButton/CheckButtonCorrect";
import {CheckButtonInCorrect} from "../../atoms/checkButton/CheckButtonInCorrect";

function RoommateSummary (){

    const { user } = useAuthState();
    const [roommates, setRoommates] = useState(null);
    const [update,toggleUpdate] = useState(false);
    const [noRoommates, setNoRoommates] = useState(false);
    const [check, toggleCheck] = useState(false);


    useEffect(() => {
        async function getRoommates() {

                const result = await getFunction(`users/all`);
                if(result.status !== null && result.status === 200) {
                    if(result.data.message === "Geen huisgenoten gevonden"){
                        setNoRoommates(true);
                    }else {
                        await setRoommates(result.data);
                    }
                }
                console.log("Roommates--> " , result);
        }
        getRoommates();
     },[update]);

    async function deleteUser(username){

        const result = await deleteFunction( `users/${username}`);
        setRoommates(null);
        toggleCheck(false);
        toggleUpdate(!update);
        console.log("delete-update-> ", result,update);
    }
    function checkBeforeDelete(firstName,lastName,username){
        toggleCheck(true);
        setRoommates({firstName,lastName,username});
    }



    return (
        <div className={styles.roommateSummary}>
            <Heading level={1} children="Huisgenoten overzicht"/>
            {check && roommates !== null &&
            <div>
                        <p>Weet je zeker dat je {roommates.firstName} {roommates.lastName} wilt verwijder?</p>
                        <CheckButtonCorrect
                            onClick={(e)=>deleteUser(roommates.username)}/>
                        <CheckButtonInCorrect
                            onClick={(e)=>{toggleCheck(false)
                                           setRoommates(null)
                                           toggleUpdate(!update)}}
                        />
            </div>}
            {noRoommates && <p>Er zijn geen huisgenoten. Voeg ze <NavLink to="/huisgenoten/toevoegen">hier</NavLink> toe</p>}
            {!check && roommates !== null && user.roles === "Huisoudste" && roommates.map((roommate) => (
                <ul key={roommate.username}>
                    <li key={roommate.username}>
                        <p>Huisgenoot: {roommate.firstName} {roommate.lastName}</p>
                        <Button
                            onClick={(e)=>checkBeforeDelete(roommate.firstName,roommate.lastName,roommate.username)}
                        >
                            Remove
                        </Button>
                        <Button
                            onClick={(e)=>console.log(roommate.username)}
                        >
                            Promote
                        </Button>
                    </li>
                </ul>
            ))
            }
            {roommates !== null && user.roles === "Huisgenoot" && roommates.map((roommate) => (
                <ul key={roommate.username}>
                    <li key={roommate.username}>
                        Huisgenoot: {roommate.firstName} {roommate.lastName}
                    </li>
                </ul>
            ))
            }
        </div>
    );
};

export default RoommateSummary;
