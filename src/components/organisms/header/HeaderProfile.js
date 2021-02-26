import React, { useState,useEffect } from "react";
import "../header/Header.css"
import {Button} from "../../atoms/button/Button";
import ProfileUser from "../profile/ProfileUser";
import UpdateProfile from "../profile/UpdateProfile";
import PasswordForm from "../passwordForm/PasswordForm";

function HeaderProfile() {

   const [element, setElement] = useState();
   const [data, setData] = useState();

    useEffect(()=> {
        setElement(<ProfileUser/>);
    },[]);


   return(
       <>
           <header>
              <Button
                  type="button"
                  onClick={() => {
                     setElement(<ProfileUser/>);
                  }}
              >
                 Profiel
              </Button>
               <Button
                   type="button"
                   onClick={() => {
                       setElement(<UpdateProfile/>);
                   }}
               >
                   Update profiel
               </Button>
           </header>
           {element}
       </>
   );
}

export default HeaderProfile;

