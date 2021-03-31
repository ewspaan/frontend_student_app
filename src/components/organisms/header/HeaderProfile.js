import React from "react";
import styles from "../header/Header.module.css";
import {useHistory} from "react-router-dom";
import { UserButton } from "../../atoms/button/UserButton";
import { AdminButton } from "../../atoms/button/AdminButton";

function HeaderProfile() {

    const history = useHistory();

    return(
           <header className={styles.headerProfile}>
                   <UserButton
                       type="button"
                       onClick={() => history.push('/huisgenoten')}
                   >
                       Huisgenoten
                   </UserButton>
                   <UserButton
                       type="button"
                       onClick={() => history.push('/huisrekening/overzicht')}
                   >
                       Huisrekening overzicht
                   </UserButton>
                   <AdminButton
                        type="button"
                        onClick={() => history.push('/huisrekening/keuren')}
                   >
                       Huisrekening controleren
                   </AdminButton>
                   <UserButton
                       type="button"
                       onClick={() => history.push('/declaratie/overzicht')}
                   >
                       Persoonlijke declaraties
                   </UserButton>
                   <AdminButton
                       type="button"
                       onClick={() => history.push('/declaratie/keuren')}
                   >
                       Declaraties keuren
                   </AdminButton>
                   <UserButton
                       type="button"
                       onClick={() => history.push('/declaratie')}
                   >
                       Boodschappen declareren
                   </UserButton>
                   <AdminButton
                       type="button"
                       onClick={() => history.push('/huisgenoten/toevoegen')}
                   >
                       Huisgenoten toevoegen
                   </AdminButton>
                   <UserButton
                       type="button"
                       onClick={() => history.push('/profiel')}
                   >
                       Profiel
                   </UserButton>
           </header>
   );
}

export default HeaderProfile;

