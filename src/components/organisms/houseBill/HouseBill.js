import React, { useState, useEffect } from "react";
import getFunction from "../../../hooks/getFunction";
import intToMonth from "../../../hooks/intToMonth";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {Button} from "../../atoms/button/Button";
import putFunction from "../../../hooks/putFunction";
import styles from "./HouseBill.module.css";

function HouseBill(){

    const { house } = useAuthState();

    const [billPayed, setBillPayed] = useState(null);
    const [billUnPayed, setBillUnPayed] = useState(null);
    const [payedBills, togglePayedBills] = useState(null);
    const [message, setMessage] = useState("")

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
        getBill();
    }

    async function createBill(){

        const result = await putFunction(`bills/create/${house.houseId}`);
        console.log(result);
        if(result.data.message !== null){
            setMessage(result.data.message);
        }
        getBill();
    }



    return(
        <div className={styles.house}>
            <div>
                <p>Het is de bedoeling dat er in het begin van de maand de huisrekening
                van de vorige maand gemaakt worden. Om niet een hele maand te hoeven wachten om te testen of het werkt druk op de button
                en het jaar van de rekening wordt verandert in een willekeurig getal</p>
                <Button onClick={createBill}>Test</Button>
                {message !== "" && <p>{message}</p>}
            </div>
            {billUnPayed !== null && billUnPayed.map((billEntry) =>
                <ul key={billEntry.month + billEntry.year}>
                    <li>{intToMonth(billEntry.month)} {billEntry.year}</li>
                    <li><p>Totaal declaraties:</p><p>{billEntry.totalAmountDeclarations}</p></li>
                    <li><p>Totaal gas/water/licht:</p><p>&euro; {billEntry.totalAmountUtilities}</p></li>
                    <li><p>Totaal deze maand:</p><p>&euro; {billEntry.totalAmountMonth}</p></li>
                    {billEntry.billResponseUsers !== null &&
                    billEntry.billResponseUsers.map((billEntryUser) =>
                    <ul key={billEntryUser.firstName + billEntryUser.lastName} className={styles.userBill}>
                            <li><p>Naam:</p><p>{billEntryUser.firstName} {billEntryUser.lastName}</p></li>
                            <li><p>Te betalen voor {intToMonth(billEntryUser.month)} {billEntryUser.year}:</p><p>&euro;  {billEntryUser.toPayMonth}</p></li>
                            <li>
                                {billEntryUser.payed === false && <Button
                                    onClick={(e)=>togglePayed(billEntryUser.id)}
                                >Betaald</Button>} </li>
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
                        <li><p>Totaal declaraties:</p><p>&euro; {billEntry.totalAmountDeclarations}</p></li>
                        <li><p>Totaal gas/water/licht:</p><p>&euro; {billEntry.totalAmountUtilities}</p></li>
                        <li><p>Totaal deze maand:</p><p>&euro; {billEntry.totalAmountMonth}</p></li>
                        {billEntry.billResponseUsers !== null &&
                        billEntry.billResponseUsers.map((billEntryUser) =>
                            <ul key={billEntryUser.firstName + billEntryUser.lastName}>
                                <li><p>Naam:</p><p>{billEntryUser.firstName} {billEntryUser.lastName} </p></li>
                                <li><p>Betaald {intToMonth(billEntryUser.month)} {billEntryUser.year}:</p><p>&euro; {billEntryUser.toPayMonth}</p></li>
                            </ul>) }
                    </ul>)}
            </div>
        </div>
    );
}

export default HouseBill;
