import React, {useEffect, useState} from "react";
import styles from "../declarationSummaryField/DeclarationSummaryField.module.css"
import getFunction from "../../../hooks/getFunction";
import { Heading } from "../../atoms/heading/Heading";
import {CheckButtonCorrect} from "../../atoms/checkButton/CheckButtonCorrect";
import {CheckButtonInCorrect} from "../../atoms/checkButton/CheckButtonInCorrect";
import putFunction from "../../../hooks/putFunction";
import {Button} from "../../atoms/button/Button";


function DeclarationSummaryField() {


    const [declarationsToCheck, setDeclarationsToCheck] = useState(null);
    const [correctDeclarations, setCorrectDeclarations] = useState(null);

    useEffect(() => {
        getDeclarations();
    },[]);

    async function getDeclarations() {

        const result = await getFunction(`declarations/all/${true}`);
        setDeclarationsToCheck(result);
    }

    async function getCorrectDeclarations(){

        if (correctDeclarations === null) {
            const result = await getFunction(`declarations/all/${false}`);
            setCorrectDeclarations(result);
        }else {
            setCorrectDeclarations(null);
        }
    }

    async function checkDeclaration(data){

        const check = {id: data.Id,
                        correct: data.correct}
        console.log("data decla--> " , check);
        const result = await putFunction("declarations/update",check)
        console.log("deca update--> " , result);
        getDeclarations();
    }




    return (
        <div>
            <Heading level={1} children="Declaraties overzicht"/>
            <div >
                {declarationsToCheck !== null && declarationsToCheck.map((declaration) => (
                    <ul key={declaration.id}>
                        <li className={styles.listItem}>
                            <p>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal
                                bedrag: &euro; {declaration.amount}</p>
                            <div>
                            <img className={styles.image} src={declaration.fileName}  alt="Logo" id="logoImg"/>
                            <CheckButtonCorrect
                                onClick={(e) => {
                                    checkDeclaration({Id: declaration.id, correct: true})
                                    }
                                }/>
                            <CheckButtonInCorrect
                                onClick={(e) => {
                                    checkDeclaration({Id: declaration.id, correct: false})
                                }}
                            />
                            </div>
                        </li>
                    </ul>
                ))
                }
            </div>
            {correctDeclarations === null ?
            <Button
                onClick={getCorrectDeclarations}
            > Haal correcte declaraties op </Button> :
            <Button
                onClick={getCorrectDeclarations}
            > Verberg correcte declaraties </Button>}
            <div >
                {correctDeclarations !== null && correctDeclarations.map((declaration) => (
                    <ul key={declaration.id}>
                        <li className={styles.listItem}>
                            <p>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal
                                bedrag: &euro; {declaration.amount}</p>
                            <img className={styles.image} src={declaration.fileName}  alt="Logo" id="logoImg"/>
                        </li>
                    </ul>
                ))
                }
            </div>
        </div>
    );
}

export default DeclarationSummaryField;
