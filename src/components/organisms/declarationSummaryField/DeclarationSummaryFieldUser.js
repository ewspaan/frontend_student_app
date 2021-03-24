import React, {useEffect, useState} from "react";
import styles from "../declarationSummaryField/DeclarationSummaryField.module.css"
import getFunction from "../../../hooks/getFunction";
import { Heading } from "../../atoms/heading/Heading";
import {Button} from "../../atoms/button/Button";
import DeclarationFormEdit from "../declarationForm/DeclarationFormEdit";


function DeclarationSummaryFieldUser() {

    const [declarationsToCheck, setDeclarationsToCheck] = useState(null);
    const [correctDeclarations, setCorrectDeclarations] = useState(null);
    const [edit, toggleEdit] = useState(true);
    const [declarationInfo, setDeclarationInfo] = useState( 0);

    useEffect(() => {
        getDeclarations();
    },[]);

    async function getDeclarations() {

        const result = await getFunction(`declarations/personal/${false}`);
        if(result.status === 200) {
            await setDeclarationsToCheck(result.data);
        }
    }

    async function getCorrectDeclarations(){

        if (correctDeclarations === null) {
            const result = await getFunction(`declarations/personal/${true}`);
            await setCorrectDeclarations(result.data);
        }else {
            setCorrectDeclarations(null);
        }
    }


    if(edit){
    return (
        <div>
            <Heading level={1} children="Declaraties overzicht"/>
            <div>{declarationsToCheck !== null && declarationsToCheck.map((declaration) => (
                    <ul key={declaration.id}>
                        <li className={styles.listItem}>
                            {<p>Totaal bedrag: &euro; {declaration.amount}</p>}
                            <div>
                                <img className={styles.image} src={declaration.fileName}  alt="Logo" id="logoImg"/>
                            </div>
                            <Button onClick={(e)=> {setDeclarationInfo(declaration.id)
                                                    toggleEdit(false)}}>
                                Verander declaratie
                            </Button>
                        </li>
                    </ul>))}
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
    );}
    else {
        return <DeclarationFormEdit id={declarationInfo}/>
    }

}

export default DeclarationSummaryFieldUser;