import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

function AuthContextProvider ({ children }){

    const [authState, setAuthState] = useState({
        status: "pending",
        error: null,
        user: null,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("token-->", token);
        async function getUserInfo() {
            try {
                // We kunnen de gebruikersdata ophalen omdat we onszelf authenticeren met de token
                const response = await axios.get(
                    'http://localhost:8080/api/users/jwtlogin',
                    {headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                            }
                        });
                //console.log("response-->" , response);
                // met het resultaat vullen we de context
                setAuthState({
                    ...authState,
                    user: {
                        id: response.data.id,
                        username: response.data.username,
                        email: response.data.email,
                        roles: response.data.roles,
                    },
                    status: "done",
                })
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
        // als we GEEM userinformatie meer in de applicatie hebben, maar er staat WEL een token in
        // local storage, gaan we handmatig de gebuikersdata ophalen door de getUserInfo functie van hierboven aan te roepen
        if (authState.user === null && token) {
            getUserInfo();
        } else {
            // Als er geen ingelogde gebruiker hoeft te zijn, zetten we de context naar de basis state
            setAuthState({
                ...authState,
                error: null,
                user: null,
                status: "done",
            });
        }

    }, []);

    function login(data){
        localStorage.setItem("token", data.accessToken);

        setAuthState({
            ...authState,
        user: {
                id: data.id,
                username: data.username,
                email: data.email,
                roles: data.roles,}
        })
    }

    function logout() {
        // 1. Maak local storage leeg
        localStorage.clear();
        // 2. Haal de user uit de context-state
        setAuthState({
            ...authState,
            user: null,
        })
    }

    return(
        <AuthContext.Provider value={{ ...authState, login, logout }}>
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

    //console.log('Ik ben authenticated:', isAuthenticated);
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
