import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from '../declarationForm/DeclarationForm.module.css';
import { Button } from "../../atoms/button/Button";
import { InputField } from "../../atoms/input/InputField";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";
import postFunction from "../../../hooks/postFunction";

function DeclarationForm(){


    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null );
    const {handleSubmit, register, errors } = useForm();

    function handleImageChange(e) {
        e.preventDefault();
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

    //file uploaden en declaratie
    async function submitFile(dataFile) {
        console.log("addFile-->  " , dataFile.groceryAmount , dataFile.fileInput);
        toggleLoading(true);
        //Haal de komma uit het bedrag
        const str = dataFile.groceryAmount;
        const correctGroceriesAmount = str.replace(",",".");
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("amount", correctGroceriesAmount);
        try {
            await postFunction(`declarations/upload`, formData, true);
        }
        catch (e){
            console.error(e);
        }

        toggleLoading(false);
    }

    return(
        <div className={styles.container}>
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
                    <InputField
                        name="groceryAmount"
                        type="text"
                        label="Kosten boodschappen:"
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
        </div>

    );
}

export default DeclarationForm;
