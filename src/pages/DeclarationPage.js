import React from "react";
import styles from "./DeclarationPage.module.css";
import DeclarationForm from "../components/organisms/declarationForm/DeclarationForm";

function DeclarationPage(){


    return (
        <div className={styles.declarationdiv}>
            <DeclarationForm/>
        </div>
    );
}

export default DeclarationPage;
