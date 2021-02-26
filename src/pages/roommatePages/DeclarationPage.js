import React, { useState, useEffect } from "react";
import "../roommatePages/DeclarationPage.css";
import axios from 'axios';
import {Button} from "../../components/atoms/button/Button";
import "../roommatePages/DeclarationPage.css"
import {ErrorMessage} from "../../components/atoms/errorMessage/ErrorMessage";
import {InputField} from "../../components/atoms/input/InputField";
import {Label} from "../../components/atoms/label/Label";
import {Heading} from "../../components/atoms/heading/Heading";
import setCurrentDateToString from "../../hooks/setCurrentDateToString";

function DeclarationPage(){


    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [error, setError] = useState("");
    const [loading, toggleLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null );
    const [groceriesAmount, setGroceriesAmount] = useState(12.34);
    const [time, setTime] = useState();

    function submitFile(e) {
        e.preventDefault();
        const day = new Date().getDate();
        const month = new Date().getMonth()+1;
        const year = new Date().getFullYear();
        setTime(day);
        console.log("time-->  " , day,month,year );
        setError("");
        if(selectedFile !== null) {
            if (groceriesAmount !== 0) {
                addFile(selectedFile);
            }
        }
        if (selectedFile === null) {
            if (groceriesAmount === 0) {
                setError("Bedrag & bon moeten ingevuld zijn");
            }
        }
            if (groceriesAmount !== 0 && selectedFile === null) {
        setError("Bon moeten ingeleverd zijn");
        }
        if (selectedFile !== null && groceriesAmount === 0) {
            setError("Bedrag moeten ingevuld zijn");
        }
    }

    function handleImageChange(e) {
        e.preventDefault();
        //console.log("e-->  " , e.target.files)
        const reader = new FileReader();
        const file = e.target.files[0];

        //setSelectedFile(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
                setSelectedFile(file);
                setImagePreviewUrl(reader.result);
        }
    }

    //preview van image laden
    useEffect(() => {
        if (!imagePreviewUrl) {
                setImagePreview(<div className="previewText">Selecteer bon om mee te sturen</div>);
        }else {
            setImagePreview(<img src={imagePreviewUrl} alt="Preview"/>);
        }},[imagePreviewUrl]);

    //file uploaden
    async function addFile(dataFile) {
        console.log("groceries-->  ", setCurrentDateToString());
        const formData = new FormData();
        formData.append("file", dataFile)
        formData.append("amount", "12.34")
        formData.append("date", setCurrentDateToString())
        formData.append("test", "11-11-1977")
        console.log("formData-date->  ", formData.getAll("date"));
        console.log("formData-test->  ", formData.getAll("test"));
        toggleLoading(true);
        const token = localStorage.getItem('token');

        try {
            const result = await axios.post(`http://localhost:8080/api/files/upload`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                        Authorization: `Bearer ${token}`
                    }}
            );
            console.log("axios result--> ", result);
            if (result.status === 200){

            }
        } catch (e) {
            console.error(e.message);
        }
        toggleLoading(false);
    }

    return(
            <div className="previewComponent">
                <div>
                    <Heading level={2} children="Hallo huisgenoot"/>
                    <div>{time}</div>
                </div>
                <form onSubmit={(e)=>submitFile(e)}>
                    <InputField
                        name="fileInput"
                        type="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e)=> {
                                        handleImageChange(e);
                                        setError("");
                        }}
                    />
                    <Label name="labelGroceryAmount" children="Kosten boodschappen:"/>
                    <InputField
                        name="groceryAmount"
                        type="text"
                        value={groceriesAmount}
                        onChange={(e)=>{
                                        console.log("groceries-->  ", groceriesAmount, e.target.value)
                                        setGroceriesAmount(e.target.value)
                                        setError("");
                        }}
                    />
                    <Button
                        disabled={loading}
                    >
                        {loading === true && "Versturen..."}
                        {loading === false && "Boodschappen declareren"}
                    </Button>
                </form>
                <div className="imgPreview">
                    {imagePreview}
                </div>
                {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
            </div>

    );
}

export default DeclarationPage;
