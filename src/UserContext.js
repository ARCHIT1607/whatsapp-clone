import { useEffect, useState } from "react";
import React from 'react';
import { firebaseApp } from "./Firebase";

export const userContext = React.createContext();

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrnentUser] =useState();

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged((user) =>{
            setCurrnentUser(user)
        });
     }, [])

return <userContext.Provider value ={currentUser}>{children}</userContext.Provider>
}
