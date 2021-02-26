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
            try {
                const result = await getFunction("declarations/all");
                setDeclarationsToCheck(result);
            } catch (e) {
                console.error(e.message);
            }
        }
    async function getGroceriesPicture() {
        const id = declarationsToCheck[0].fileId;
        try{
            const result = await getFunction(`files/download/${id}`, true);
            console.log(result);
            //setGroceriesPicture(result);
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
            <img src={groceriesPicture} alt="Preview" className={styles.image}/>
            <div className={styles.huisgenoot}>
                {declarationsToCheck && declarationsToCheck.map((declaration) =>(
                    <>
                        <p className={declaration.declarationId}>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal bedrag: &euro; {amount}</p>
                        <Button
                            className={declaration.declarationId}
                            onClick={(e)=> {
                                getGroceriesPicture();
                                console.log("e--> ",e);
                            }}
                            >Check</Button>
                    </>
                    ))
                }
            </div>
        </div>
    );
}

export default DeclarationSummaryPage;
