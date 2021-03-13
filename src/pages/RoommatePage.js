import React, { useState } from 'react';
import {Heading} from "../components/atoms/heading/Heading";
import getFunction from "../hooks/getFunction";
import {Button} from "../components/atoms/button/Button";

function RoommatePage (){

    const [roommates, setRoommates] = useState(null);
    const [test, setTest] = useState();

    async function getRoommates() {
        try {
            const result = await getFunction(`users/all`);
            setRoommates(result);
            //console.log("Roommates--> " , result);

        } catch (e) {
            console.error(e.message);
        }
    }

    console.log("test--> " , test);
    return (
        <div>
            <Heading level={1} children="Huisgenoten overzicht overzicht"/>
            <Button onClick={getRoommates}/>
                {roommates !== null && roommates.map((declaration) => (
                    <ul key={declaration.username}>
                        <li key={declaration.username}>
                            Huisgenoot: {declaration.firstName} {declaration.lastName}
                            <Button
                                onClick={(e)=>setTest(declaration.firstName)}
                            >
                                Remove
                            </Button>
                        </li>
                    </ul>
                ))
                }
        </div>
    );
};

export default RoommatePage;
