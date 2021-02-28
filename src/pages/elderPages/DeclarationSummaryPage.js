import React, { useState, useEffect } from "react";
import styles from "../elderPages/DeclarationSummaryPage.module.css";
import {Heading} from "../../components/atoms/heading/Heading";
import {Button} from "../../components/atoms/button/Button";
import getFunction from "../../hooks/getFunction";

function DeclarationSummaryPage () {

    const [amount,setAmount] = useState(" 0,01");
    const [roommate, setRoommate] =useState("Erwin");
    const [downloadedFile,setDownloadedFile] = useState();
    const [groceriesPicture,setGroceriesPicture] = useState(null);
    const [declarationsToCheck, setDeclarationsToCheck] = useState(null);

    async function getDeclarations() {
        try{
            const result = await getFunction(`declarations/all`);
            setDeclarationsToCheck(result);
            console.log(result);
            } catch (e) {
                console.error(e.message);
            }
        }

    useEffect(()=> {
        getDeclarations();
        },[]);

    return(
        <div className={styles["declaration-list"]}>
            <Heading level={1} children="Declaraties overzicht"/>
            <div className={styles.huisgenoot}>
                {declarationsToCheck === null && declarationsToCheck.map((declaration) =>(
                    <ul>
                        <li className={declaration.amount}>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal bedrag: &euro; {declaration.amount}</li>
                    </ul>
                    ))
                }
            </div>
        </div>
    );
}

export default DeclarationSummaryPage;
