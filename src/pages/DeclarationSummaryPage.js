import React from "react";
import DeclarationSummaryFieldUser from "../components/organisms/declarationSummaryField/DeclarationSummaryFieldUser";
import styles from "./Page.module.css";




function DeclarationSummaryPage () {

    return (
        <div className={styles.page}>
            <DeclarationSummaryFieldUser/>
        </div>
    );


}

export default DeclarationSummaryPage;
