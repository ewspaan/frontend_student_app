import React, {useEffect, useState} from "react";
import styles from "../declarationSummaryField/DeclarationSummaryField.module.css"
import getFunction from "../../../hooks/getFunction";
import { Heading } from "../../atoms/heading/Heading";
import {CheckButtonCorrect} from "../../atoms/checkButton/CheckButtonCorrect";
import {CheckButtonInCorrect} from "../../atoms/checkButton/CheckButtonInCorrect";
import putFunction from "../../../hooks/putFunction";
import {Button} from "../../atoms/button/Button";
import deleteFunction from "../../../hooks/deleteFunction";
import intToMonth from "../../../hooks/intToMonth";


function DeclarationSummaryField() {


    const [declarationsToCheck, setDeclarationsToCheck] = useState(null);
    const [declarationsInCorrect, setDeclarationsInCorrect] = useState(null);
    const [correctDeclarations, setCorrectDeclarations] = useState(null);

    useEffect(() => {
        getDeclarations();
    },[]);

    async function getDeclarations() {

        const result = await getFunction(`declarations/all/${false}`);
        console.log("check--> ",result);
        const checkAble = result.data.filter((declaration) => {
        return declaration.checked === false;
        })
        console.log("checkAble--> ",checkAble);
        await setDeclarationsToCheck(checkAble);
        const inCorrect = result.data.filter((declaration) => {
            return declaration.checked === true && declaration.correct === false;
        })
        console.log("incorrect--> ", inCorrect);
        if(inCorrect.lenght !== 0) {
            await setDeclarationsInCorrect(inCorrect);
        }else {
            await setDeclarationsInCorrect(null);
        }
        console.log("incorrect-decla-> ", declarationsInCorrect);
    }

    async function getCorrectDeclarations(){

        if (correctDeclarations === null) {
            const result = await getFunction(`declarations/all/${true}`);
            await setCorrectDeclarations(result.data);
        }else {
            setCorrectDeclarations(null);
        }
    }

    async function checkDeclaration(data){

        const check = {id: data.Id,
                        correct: data.correct}
        const result = await putFunction("declarations/checked",check)
        console.log("deca update--> " , result);
        await getDeclarations();
    }

    async function deleteDeclaration(declarationId){
        const result = await deleteFunction(`declarations/delete/${declarationId}`);
        console.log(result);
        await getDeclarations();
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
            <>
                <Heading level={1} children="Incorrecte declaraties"/>
                {declarationsInCorrect !== null && declarationsInCorrect.map((declaration) => (
                    <ul key={declaration.id}>
                        <li className={styles.listItem}>
                            <p>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal
                                bedrag: &euro; {declaration.amount}</p>
                            <div>
                                <img className={styles.image} src={declaration.fileName}  alt="Logo" id="logoImg"/>
                                <Button
                                    onClick={(e) => deleteDeclaration(declaration.id)}>
                                    Verwijder
                                </Button>
                            </div>
                        </li>
                    </ul>
                ))
                }
            </>
            {correctDeclarations === null ?
            <Button
                onClick={getCorrectDeclarations}
            > Haal correcte declaraties op </Button> :
            <Button
                onClick={getCorrectDeclarations}
            > Verberg correcte declaraties </Button>}
            <div >
                {correctDeclarations !== null && correctDeclarations.map((declaration) => (
                    <ul key={declaration.id} className={styles.listItem}>
                        <li><p>Gedeclareerd in {intToMonth(declaration.month)} {declaration.year}</p></li>
                        <li><p>Totaal bedrag: &euro; {declaration.amount}</p></li>
                        <li><img className={styles.image} src={declaration.fileName}  alt="Logo" id="logoImg"/></li>
                    </ul>
                ))
                }
            </div>
        </div>
    );
}

export default DeclarationSummaryField;
