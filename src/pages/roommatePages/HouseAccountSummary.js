import React, { useState, useEffect } from "react";
import axios from 'axios';
import {Heading} from "../../components/atoms/heading/Heading";

function HouseAccountSummary(){

    return(
        <>
        <Heading level={1} children="Overzicht huisrekening"/>
        </>
    );
}

export default HouseAccountSummary;
