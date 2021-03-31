import React from "react";
import DeclarationSummaryField from "../components/organisms/declarationSummaryField/DeclarationSummaryField";
import styles from "./Page.module.css";

function DeclarationCheckPage() {


    return (
        <div className={styles.page}>
            <DeclarationSummaryField/>
        </div>
    )
}

export default DeclarationCheckPage;
