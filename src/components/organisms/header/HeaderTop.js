import React, { useContext} from "react";
import "../header/Header.css";
import { useHistory } from 'react-router-dom';
import { Logo } from "../../atoms/Logo/Logo";
import { Button } from "../../atoms/button/Button";
import { AuthContext, useAuthState } from "../../../context/authContext/AuthContext";
import {Heading} from "../../atoms/heading/Heading";

function HeaderTop(){
    const history = useHistory();

    const { isAuthenticated ,logout } = useAuthState();

    return(
        <header>
            <Logo/>
            <Heading children="StudentenApp" level={1}/>
            <div>
                <Button
                    type="button"
                    onClick={() => history.push('/')}
                >
                   Home
                </Button>
                {isAuthenticated ? (
                    <Button
                        type="button"
                        onClick={() => logout()}
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
        </header>
    );

}

export default HeaderTop;
