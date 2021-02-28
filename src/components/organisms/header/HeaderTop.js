import React, { useEffect, useState } from "react";
import styles from "../header/Header.module.css";
import { useHistory } from 'react-router-dom';
import { Logo } from "../../atoms/Logo/Logo";
import { Button } from "../../atoms/button/Button";
import { useAuthState } from "../../../context/authContext/AuthContext";
import {Heading} from "../../atoms/heading/Heading";
import HeaderHouseElder from "./HeaderHouseElder";
import HeaderRoomMate from "./HeaderRoomMate";
import HeaderProfile from "./HeaderProfile";

function HeaderTop(){


    const { isAuthenticated ,logout, user } = useAuthState();
    const history = useHistory();
    const [element, setElement] = useState(<header> </header>);

    useEffect(() => {

        if(user !== null && isAuthenticated){
            switch(user.roles) {
                case "ROLE_MODERATOR":
                    setElement(<HeaderHouseElder/>)
                    break;
                case "ROLE_USER":
                    setElement(<HeaderRoomMate/>)
                    break;
                default:
                    setElement(<header>Bla</header>)
                    break;
            }
        }
    },[history])

    return(
        <>
        <header className={styles.header}>
            <Logo/>
            <Heading children="StudentenApp" level={1}/>
            <div className={styles.div}>
                <Button
                    type="button"
                    onClick={() => history.push('/')}
                >
                   Home
                </Button>
                {isAuthenticated ? (
                    <Button
                        type="button"
                        onClick={() => {logout()
                        history.push('/')
                        setElement(null)}}
                    >
                        Log uit
                    </Button>
                ) : (
                    <>
                        <Button
                            type="button"
                            onClick={() => history.push('/login')}
                        >
                            Log in
                        </Button>
                        <Button
                            type="button"
                            onClick={() => history.push('/signup')}
                        >
                            Registreren
                        </Button>
                    </>
                )}
            </div>
            {isAuthenticated === true && <HeaderProfile/>}
        </header>
        </>
    );

}

export default HeaderTop;
