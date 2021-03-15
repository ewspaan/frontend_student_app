import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from '../declarationForm/DeclarationForm.module.css';
import { Button } from "../../atoms/button/Button";
import { InputField } from "../../atoms/input/InputField";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";
import postFunction from "../../../hooks/postFunction";
import postDataFunction from "../../../hooks/postDataFunction";

function DeclarationForm(){


    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null );
    const {handleSubmit, register, errors } = useForm();

    async function handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        const file64 = await convertBase64(file);
        //setSelectedFile(file);
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(file64);
            setImagePreviewUrl(reader.result);
        }
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader= new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = ( () => {
                resolve(fileReader.result);
            });
            fileReader.onerror = ((error) => {
                reject(error);
            });
        });
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
        const str = dataFile.groceryAmount;
        const correctGroceriesAmount = str.replace(",",".");
        toggleLoading(true);
        const data = { fileName: selectedFile,
                        amount: correctGroceriesAmount};
        console.log("addFile-->  " , data);
        const result = await postDataFunction("declarations/upload", data);
        console.log("declaresult-->  ", result);
        // //Haal de komma uit het bedrag

        // const correctGroceriesAmount = str.replace(",",".");
        // const formData = new FormData();
        // formData.append("file", selectedFile);
        // formData.append("amount", correctGroceriesAmount);
        // try {
        //     await postFunction(`declarations/upload`, formData, true);
        // }
        // catch (e){
        //     console.error(e);
        // }
        //
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
