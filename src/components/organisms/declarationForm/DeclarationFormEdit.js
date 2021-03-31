import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from '../declarationForm/DeclarationForm.module.css';
import { Button } from "../../atoms/button/Button";
import { InputField } from "../../atoms/input/InputField";
import { ErrorMessage } from "../../atoms/errorMessage/ErrorMessage";
import getFunction from "../../../hooks/getFunction";
import {Label} from "../../atoms/label/Label";
import putFunction from "../../../hooks/putFunction";

function DeclarationFormEdit({id,toggleEdit}){

    const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, toggleLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const {handleSubmit, register, errors} = useForm();


    async function handleImageChange(e) {
        e.preventDefault();
        const reader = new FileReader();
        const file = e.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFile(reader.result);
            setImagePreviewUrl(reader.result);
        }
    }

    async function getDeclarationToEdit(){
        const result = await getFunction(`declarations/personal/edit/${id}`);
        await setImagePreviewUrl(result.data.fileName);
        setSelectedFile(result.data.fileName);
        console.log("bla--> ", result);
    }

    useEffect(() => {
        getDeclarationToEdit();
    },[]);

    //preview van image laden
    useEffect(() => {
        if (!imagePreviewUrl) {
            setImagePreview(<div className="previewText">Selecteer bon om mee te sturen</div>);
        }else {
            setImagePreview(<img className={styles.previewImage} src={imagePreviewUrl} alt="Preview"/>);
        }
    },[imagePreviewUrl]);

    //file uploaden en declaratie
    async function submitFile(dataFile) {
        const str = dataFile.groceryAmount;
        const correctGroceriesAmount = str.replace(",",".");
        toggleLoading(true);
        const data = { fileName: selectedFile,
                        amount: correctGroceriesAmount,
                        id:id};
        const result = await putFunction("declarations/edit", data);
        console.log("declaresult-->  ", result);
        toggleLoading(false);
        toggleEdit(true);
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
                        onChange={(e)=> handleImageChange(e)}
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
                        {loading === false && "Declaratie veranderen"}
                    </Button>
                </form>
                {errors.groceryAmount && <ErrorMessage className={styles["error_message"]}>{errors.groceryAmount.message}</ErrorMessage>}
                {errors.fileInput && <ErrorMessage className={styles["error_message"]}>{errors.fileInput.message}</ErrorMessage>}
            </div>
        </div>

    );
}

export default DeclarationFormEdit;
