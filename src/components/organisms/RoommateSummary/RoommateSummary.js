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
import postDataFunction from "../../../hooks/postDataFunction";

function RoommateSummary (){

    const { user } = useAuthState();
    const [roommates, setRoommates] = useState(null);
    const [update,toggleUpdate] = useState(false);
    const [noRoommates, setNoRoommates] = useState(false);
    const [checkDelete, toggleCheckDelete] = useState(false);
    const [checkPromote, toggleCheckPromote] = useState(false);

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
        toggleCheckDelete(false);
        toggleUpdate(!update);
        console.log("delete-update-> ", result,update);
    }

    async function promoteUser(username){

        const result = await postDataFunction( `users/promote/${username}`);
        setRoommates(null);
        toggleCheckPromote(false);
        toggleUpdate(!update);
        console.log("delete-update-> ", result,update);
    }

    function checkBeforeDelete(firstName,lastName,username){
        toggleCheckDelete(true);
        setRoommates({firstName,lastName,username});
    }

    function checkBeforePromotion(firstName,lastName,username){
        toggleCheckPromote(true);
        setRoommates({firstName,lastName,username});
    }



    return (
        <div className={styles.roommateSummary}>
            <Heading level={1} children="Huisgenoten overzicht"/>
            {checkDelete && roommates !== null &&
            <div>
                        <p>Weet je zeker dat je {roommates.firstName} {roommates.lastName} wilt verwijder?</p>
                        <CheckButtonCorrect
                            onClick={(e)=>deleteUser(roommates.username)}/>
                        <CheckButtonInCorrect
                            onClick={(e)=>{toggleCheckDelete(false)
                                           setRoommates(null)
                                           toggleUpdate(!update)}}
                        />
            </div>}
            {checkPromote && roommates !== null &&
            <div>
                <p>Weet je zeker dat je {roommates.firstName} {roommates.lastName} wilt promoveren?</p>
                <CheckButtonCorrect
                    onClick={(e)=>promoteUser(roommates.username)}/>
                <CheckButtonInCorrect
                    onClick={(e)=>{toggleCheckPromote(false)
                        setRoommates(null)
                        toggleUpdate(!update)}}
                />
            </div>}
            {noRoommates && <p>Er zijn geen huisgenoten. Voeg ze <NavLink to="/huisgenoten/toevoegen">hier</NavLink> toe</p>}
            {!checkDelete && !checkPromote && roommates !== null && user.roles === "Huisoudste" && roommates.map((roommate) => (
                <ul key={roommate.username}>
                    <li key={roommate.username}>
                        <p>Huisgenoot: {roommate.firstName} {roommate.lastName}</p>
                        <Button
                            onClick={(e)=>checkBeforeDelete(roommate.firstName,roommate.lastName,roommate.username)}
                        >
                            Remove
                        </Button>
                        {roommate.roles === "ROLE_USER" && <Button
                            onClick={(e)=>checkBeforePromotion(roommate.firstName,roommate.lastName,roommate.username)}
                        >
                            Promote
                        </Button>}
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
