import React, { useState , useEffect } from "react";
import getFunction from "../../../hooks/getFunction";
import intToMonth from "../../../hooks/intToMonth";
import {Button} from "../../atoms/button/Button";

function HouseBillUser(){

    const [bill, setBill] = useState(null);
    const [payedBills, setPayedBills] = useState(null);
    const [show, toggleShow] = useState(true);

    useEffect(() => {
        getBill(false);
    },[]);

    async function getBill(payed) {

        const result = await getFunction(`bills/personal/${payed}`);
        console.log("Billuserpersonal--> " , result.data);
        if(result.status === 200 ) {
            if(!payed) {
                await setBill(result.data);
            }
            if(payed){
                await setPayedBills(result.data);
            }
        }
    }

    function getPayedBills(){

        if(!show){
            setPayedBills(null);
        }else{
            getBill(true);
        }
        toggleShow(!show);
    }


    return(
        <>
            {bill !== null && bill.map((billEntry) =>
                <ul key={billEntry.month + billEntry.year} >
                    <li> Te betalen voor {intToMonth(billEntry.month)} {billEntry.year}: {billEntry.toPayMonth} </li>
                    <li> Totale declaraties: {billEntry.declarationsUser}</li>
                </ul> )}
                <Button
                    onClick={getPayedBills}
                >
                    {show === true ? "Haal betaalde rekeningen op" : "Verberg betaalde rekeningen"}
                </Button>
            {payedBills !== null && payedBills.map((billEntry) =>
                <ul key={billEntry.month + billEntry.year} >
                    <li> Betaalt voor {intToMonth(billEntry.month)} {billEntry.year}: {billEntry.toPayMonth} </li>
                    <li> Totale declaraties: {billEntry.declarationsUser}</li>
                </ul> )}

        </>
    );
}

export default HouseBillUser;