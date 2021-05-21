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
                setAuthState({
                    ...authState,
                    error: e,
                    user: null,
                    status: "done",
                });
                console.error(e);
            }
        }
        if (authState.user === null && token) {
            getUserInfo();
        } else {
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
        localStorage.clear();
        setAuthState({
            ...authState,
            user: null,
            house: null,
        })
    }

    async function setUserAndHouse(){
        try{
            const result = await getFunction("users/download");
            const response = result.data;
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
                    houseId: response.houseId,
                    houseName: response.houseName,
                    accountNumber: response.accountNumber,
                    waterUtility: response.waterUtility,
                    gasUtility: response.gasUtility,
                    elektraUtility: response.elektraUtility,
                    internetUtility: response.internetUtility,
                },
                status: "done",
            })
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
