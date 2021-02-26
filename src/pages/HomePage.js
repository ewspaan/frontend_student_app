import React from 'react';
import PhotoWarande from "../assets/Homepage_Warande.jpg";
import styles from "./elderPages/DeclarationSummaryPage.module.css";




function HomePage(){

    return(
        <div className="page-container">
            <img src={PhotoWarande} alt="Foto Studentenhuis"/>
            <img src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='} alt="Preview"/>
            <p>Dit is de app om je financiële zaken te regelen voor je studentenhuis.</p>
        </div>
    );
}

export default HomePage;
