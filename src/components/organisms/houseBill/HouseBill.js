import React, { useState, useEffect } from "react";
import getFunction from "../../../hooks/getFunction";
import intToMonth from "../../../hooks/intToMonth";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {Button} from "../../atoms/button/Button";
import putFunction from "../../../hooks/putFunction";
import styles from "../declarationSummaryField/DeclarationSummaryField.module.css";

function HouseBill(){

    const { house } = useAuthState();

    const [billPayed, setBillPayed] = useState(null);
    const [billUnPayed, setBillUnPayed] = useState(null);
    const [payedBills, togglePayedBills] = useState(null);

    useEffect(() => {
        getBill();
    },[]);

    async function getBill() {

        const result = await getFunction(`bills/house/${house.houseId}`)
        console.log("bill--> ", result);
        if(result.status === 200 ) {
            const payedBills = result.data.filter((bill) => {return bill.payed === true})
            await setBillPayed(payedBills);
            const unPayedBills = result.data.filter((bill) => {return bill.payed === false})
            await setBillUnPayed(unPayedBills);
        }
    }

    function getPayedBills(){

        if(payedBills === null){
            togglePayedBills(billPayed);
        }else{
            togglePayedBills(null);
        }

    }

    async function togglePayed(id){

        const result = await putFunction(`bills/payed/${id}`);
        console.log(result);
    }



    return(
        <div className="house">
            {billUnPayed !== null && billUnPayed.map((billEntry) =>
                <ul key={billEntry.month + billEntry.year}>
                    <li>{intToMonth(billEntry.month)} {billEntry.year}</li>
                    <li>Totaal declaraties:     {billEntry.totalAmountDeclarations}</li>
                    <li>Totaal gas/water/licht: {billEntry.totalAmountUtilities}</li>
                    <li>Totaal deze maand:      {billEntry.totalAmountMonth}</li>
                    {billEntry.billResponseUsers !== null &&
                    billEntry.billResponseUsers.map((billEntryUser) =>
                        <ul key={billEntryUser.firstName + billEntryUser.lastName}>
                            <li>Naam: {billEntryUser.firstName} {billEntryUser.lastName} </li>
                            <li>Te betalen voor {intToMonth(billEntryUser.month)} {billEntryUser.year}: {billEntryUser.toPayMonth}</li>
                            <li>
                                <Button
                                    onClick={(e)=>togglePayed(billEntryUser.id)}
                                >Betaald</Button> </li>
                        </ul>) }
                </ul>)}
            {payedBills === null ?
                <Button
                    onClick={getPayedBills}
                > Betaalde rekeningen </Button> :
                <Button
                    onClick={getPayedBills}
                > Verberg betaalde rekeningen </Button>}
            <div>
                {payedBills !== null && payedBills.map((billEntry) =>
                    <ul key={billEntry.month + billEntry.year}>
                        <li>{intToMonth(billEntry.month)} {billEntry.year}</li>
                        <li>Totaal declaraties:     {billEntry.totalAmountDeclarations}</li>
                        <li>Totaal gas/water/licht: {billEntry.totalAmountUtilities}</li>
                        <li>Totaal deze maand:      {billEntry.totalAmountMonth}</li>
                        {billEntry.billResponseUsers !== null &&
                        billEntry.billResponseUsers.map((billEntryUser) =>
                            <ul key={billEntryUser.firstName + billEntryUser.lastName}>
                                <li>Naam: {billEntryUser.firstName} {billEntryUser.lastName} </li>
                                <li>Betaald: {intToMonth(billEntryUser.month)} {billEntryUser.year}: {billEntryUser.toPayMonth}</li>
                            </ul>) }
                    </ul>)}
            </div>
        </div>
    );
}

export default HouseBill;
