import React, { useState } from "react";
import styles from "../declarationSummaryField/DeclarationSummaryField.module.css"
import getFunction from "../../../hooks/getFunction";
import { Heading } from "../../atoms/heading/Heading";
import { Button } from "../../atoms/button/Button";
import { Logo } from "../../atoms/Logo/Logo";

function DeclarationSummaryField() {


    const [declarationsToCheck, setDeclarationsToCheck] = useState(null);
    const [image, setImage] = useState()

    async function getDeclarations() {

            const result = await getFunction(`declarations/all`);
            setDeclarationsToCheck(result);
            console.log(result);
    }

    return (
        <div>
            <Heading level={1} children="Declaraties overzicht"/>
            {image && <img className={styles.image} src={image}  alt="Logo" id="logoImg"/>}
            <div >
                {declarationsToCheck !== null && declarationsToCheck.map((declaration) => (
                    <ul key={declaration.id}>
                        <li className={styles.listItem}>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal
                            bedrag: &euro; {declaration.amount}
                            <Button
                                onClick={(e)=> {
                                    console.log(declaration.firstName)
                                    setImage(declaration.fileName)}}
                            >
                                Correct
                            </Button>
                            <Button
                                onClick={(e)=>{
                                    console.log(declaration.firstName)
                                    setImage(declaration.fileName)}}
                            >
                                Not correct
                            </Button>
                        </li>
                    </ul>
                ))
                }
            </div>
            <Button
                onClick={getDeclarations}
            >
                +
            </Button>
        </div>
    );
}

export default DeclarationSummaryField;
