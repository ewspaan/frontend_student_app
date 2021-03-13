import React from "react";
import styles from "../header/Header.module.css";
import {Button} from "../../atoms/button/Button";
import {useAuthState} from "../../../context/authContext/AuthContext";
import {useHistory} from "react-router-dom";
import {Heading} from "../../atoms/heading/Heading";
function HeaderProfile() {

    const { user } = useAuthState();
    const history = useHistory();


   return(
       <>
           <header className={styles.header}>
               <Heading children="Hoi" level={2}> </Heading>
               <>
                   <Button
                       type="button"
                       onClick={() => history.push('/huisgenoten')}
                   >
                       Huisgenoten
                   </Button>
                   <Button
                       type="button"
                       onClick={() => history.push('/huisrekening')}
                   >
                       Huisrekening overzicht
                   </Button>
                   {user !== null && user.roles === "Huisoudste" && <Button
                       type="button"
                       onClick={() => history.push('/declaratie/overzicht')}
                   >
                       Declaraties overzicht
                   </Button>}
                   <Button
                       type="button"
                       onClick={() => history.push('/declaratie')}
                   >
                       Boodschappen declareren
                   </Button>
                   {user !== null && user.roles === "Huisoudste" && <Button
                       type="button"
                       onClick={() => history.push('/huisgenoten/toevoegen')}
                   >
                       Huisgenoten toevoegen
                   </Button>}
                   <Button
                       type="button"
                       onClick={() => history.push('/profiel')}
                   >
                       Profiel
                   </Button>
               </>
           </header>

       </>
   );
}

export default HeaderProfile;

