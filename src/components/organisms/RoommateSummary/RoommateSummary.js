import React, {useEffect, useState} from 'react';
import { Heading } from "../../atoms/heading/Heading";
import { Button } from "../../atoms/button/Button";
import getFunction from "../../../hooks/getFunction";
import { useAuthState } from "../../../context/authContext/AuthContext";
import deleteFunction from "../../../hooks/deleteFunction";

function RoommateSummary (){

    const { user } = useAuthState();
    const [roommates, setRoommates] = useState(null);
    const [update,toggleUpdate] = useState(false);


    useEffect(() => {
        async function getRoommates() {

                const result = await getFunction(`users/all`);
                await setRoommates(result.data);
                //console.log("Roommates--> " , result);
        }
        getRoommates();
     },[update]);

    async function deleteUser(username){
        const result = await deleteFunction( `users/${username}`);
        toggleUpdate(!update);
        console.log("delete-update-> ", result,update);
    }



    return (
        <div>
            <Heading level={1} children="Huisgenoten overzicht overzicht"/>
            {roommates !== null && user.roles === "Huisoudste" && roommates.map((roommate) => (
                <ul key={roommate.username}>
                    <li key={roommate.username}>
                        Huisgenoot: {roommate.firstName} {roommate.lastName}
                        <Button
                            onClick={(e)=>deleteUser(roommate.username)}
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
