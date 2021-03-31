import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from '../declarationForm/DeclarationForm.module.css';
import { Button } from "../../atoms/button/Button";
import { InputField } from "../../atoms/input/InputField";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";
import postDataFunction from "../../../hooks/postDataFunction";
import {Label} from "../../atoms/label/Label";

function DeclarationForm(){

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [succes,toggleSucces] = useState(false);
    const [message, setMessage] = useState("");
    const {handleSubmit, register, errors } = useForm();


    async function handleImageChange(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const file64 = await convert(file);
        setSelectedFile(file64);
    }

    function convert(file) {
        return new Promise((resolve, reject) => {
            const reader= new FileReader()
            reader.readAsDataURL(file)
            reader.onload = ( () => {
                resolve(reader.result);
                setImagePreviewUrl(reader.result);
            });
            reader.onerror = ((error) => {
                reject(error);
            });
        });
    }

    //preview van image laden
    useEffect(() => {
        if (!imagePreviewUrl) {
            setImagePreview(<div className="previewText">Selecteer bon om mee te sturen</div>);
        }else {
            setImagePreview(<img className={styles.previewImage} src={imagePreviewUrl} alt="Preview"/>);
        }},[imagePreviewUrl]);

    //file uploaden en declaratie
    async function submitFile(dataFile) {
        const str = dataFile.groceryAmount;
        const correctGroceriesAmount = str.replace(",",".");
        toggleLoading(true);
        const data = { fileName: selectedFile,
                        amount: correctGroceriesAmount};
        const result = await postDataFunction("declarations/upload", data);
        console.log("declaresult-->  ", result);
        if (result.data.message !== null) {
            setMessage(result.data.message);
        }
        toggleLoading(false);
        toggleSucces(true);
        setImagePreview(null);
        setImagePreviewUrl(null);
    }

    return(
        <div className={styles.container}>
            {succes ? <p onClick={() =>toggleSucces(false)}>{message}. Klik hier om terug te keren</p> :
            <>
            <div className={styles["image_preview"]}>
                {imagePreview}
            </div>
            <div className={styles["preview_component"]}>
                <form className={styles["image_form"]} onSubmit={handleSubmit(submitFile)}>
                    <InputField
                        name="fileInput"
                        type="file"
                        accept=".jpeg, .png, .jpg"
                        onChange={(e)=> {
                            handleImageChange(e);
                        }}
                        fieldRef={register(
                            {
                            required: {
                                value: true,
                                message: "Foto van bonnetje is verplicht"
                            }
                        })}
                    />
                    <Label>Kosten boodschappen:</Label>
                    <InputField
                        name="groceryAmount"
                        type="text"
                        fieldRef={register(
                            {
                                required: {
                                    value: true,
                                    message: "Vul een bedrag in"
                                },
                                pattern: {
                                    value: /^[0-9]+(,[0-9]{1,2})?$/,
                                    message: "Vul een correct bedrag in"
                                }
                            })}
                    />
                    <Button
                        disabled={loading}
                    >
                        {loading === true && "Versturen..."}
                        {loading === false && "Boodschappen declareren"}
                    </Button>
                </form>
                {errors.groceryAmount && <ErrorMessage className={styles["error_message"]}>{errors.groceryAmount.message}</ErrorMessage>}
                {errors.fileInput && <ErrorMessage className={styles["error_message"]}>{errors.fileInput.message}</ErrorMessage>}
            </div>
            </>}
        </div>

    );
}

export default DeclarationForm;
