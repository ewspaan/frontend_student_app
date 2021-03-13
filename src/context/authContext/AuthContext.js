import React, { createContext, useState, useEffect, useContext } from 'react';
import getFunction from "../../hooks/getFunction";

const AuthContext = createContext({});

function AuthContextProvider ({ children }){

    const [authState, setAuthState] = useState({
        status: "pending",
        error: null,
        user: null,
        house: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token-->", token);
        async function getUserInfo() {
            try {
                await setUserAndHouse();
            } catch (e) {
                // Gaat er toch iets mis? Dan zetten we de error in de context
                setAuthState({
                    ...authState,
                    error: e,
                    user: null,
                    status: "done",
                });
                console.error(e);
            }
        }
        // als we geen userinformatie meer in de applicatie hebben, maar er staat WEL een token in
        // local storage, gaan we handmatig de gebuikersdata ophalen door de getUserInfo functie van hierboven aan te roepen
        if (authState.user === null && token) {
            getUserInfo();
        } else {
            // Als er geen ingelogde gebruiker hoeft te zijn, zetten we de context naar de basis state
            setAuthState({
                ...authState,
                error: null,
                user: null,
                house: null,
                status: "done",
            });
        }
    }, []);

    function login(data){
        localStorage.setItem("token", data.accessToken);
        setUserAndHouse();
    }

    function logout() {
        // 1. Maak local storage leeg
        localStorage.clear();
        // 2. Haal de user uit de context-state
        setAuthState({
            ...authState,
            user: null,
            house: null,
        })
    }

    async function setUserAndHouse(){
        try{
            const response = await getFunction("users/download");
            console.log("setUserAndHous-->  ", response);
            let role = "";
            if(response.roles === "ROLE_MODERATOR") {
                role = "Huisoudste"
            }
            if(response.roles === "ROLE_USER") {
                role = "Huisgenoot"
            }
            setAuthState({
                ...authState,
                user: {
                    id: response.id,
                    username: response.username,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    email: response.email,
                    dateOfBirth: response.dateOfBirth,
                    roles: role},
                house: {
                    houseName: response.houseName,
                    accountNumber: response.accountNumber,
                    waterUtility: response.waterUtility,
                    gasUtility: response.gasUtility,
                    elektraUtility: response.elektraUtility,
                    internetUtility: response.internetUtility,
                },
                status: "done",
            })
            console.log("user-->  ", role);
        }
        catch (e){
            setAuthState({
                ...authState,
                error: e,
                user: null,
                house: null,
                status: "done",
            });
            console.error(e);
        }
    }


    return(
        <AuthContext.Provider value={{ ...authState, login, logout, setUserAndHouse }}>
            {authState.status === "done" && children}
            {authState.status === "pending" && <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

function useAuthState() {
    const authState = useContext(AuthContext);
    // iemand is geauthoriseerd wanneer de status === 'done'
    // en als er een gebruiker in de authState staat
    const isDone = authState.status === "done";
    const isAuthenticated = authState.user !== null && isDone;

    return {
        ...authState,
        isAuthenticated: isAuthenticated,
    }
}

export {
    AuthContext,
    useAuthState,
    AuthContextProvider,
};
