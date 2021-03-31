import React from "react";
import styles from "./Page.module.css";
import DeclarationForm from "../components/organisms/declarationForm/DeclarationForm";

function DeclarationPage(){


    return (
        <div className={styles.page}>
            <DeclarationForm/>
        </div>
    );
}

export default DeclarationPage;
