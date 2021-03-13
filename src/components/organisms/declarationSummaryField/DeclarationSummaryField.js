import React from "react";
//import getFunction from "../../../hooks/getFunction";
import { Heading } from "../../atoms/heading/Heading";

function DeclarationSummaryField() {


    // const [declarationsToCheck, setDeclarationsToCheck] = useState(null);
    //
    // async function getDeclarations() {
    //     try {
    //         const result = await getFunction(`declarations/all`);
    //         setDeclarationsToCheck(result);
    //         console.log(result);
    //     } catch (e) {
    //         console.error(e.message);
    //     }
    // }

    return (
        <div>
            <Heading level={1} children="Declaraties overzicht"/>
            <div >
                {/*{declarationsToCheck === null && declarationsToCheck.map((declaration) => (*/}
                {/*    <ul>*/}
                {/*        <li className={declaration.amount}>Huisgenoot: {declaration.firstName} {declaration.lastName} Totaal*/}
                {/*            bedrag: &euro; {declaration.amount}</li>*/}
                {/*    </ul>*/}
                {/*))*/}
                {/*}*/}
            </div>
        </div>
    );
}

export default DeclarationSummaryField;
