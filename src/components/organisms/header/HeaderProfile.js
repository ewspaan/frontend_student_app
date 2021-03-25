import React from "react";
import styles from "../header/Header.module.css";
import {Button} from "../../atoms/button/Button";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import {Heading} from "../../atoms/heading/Heading";
import { UserButton } from "../../atoms/button/UserButton";
import { AdminButton } from "../../atoms/button/AdminButton";

function HeaderProfile() {

    const { user } = useAuthState();
    const history = useHistory();


   return(
       <>
           <header className={styles.header}>
               <Heading children="Hoi" level={2}> </Heading>
               <>
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
               </>
           </header>

       </>
   );
}

export default HeaderProfile;

