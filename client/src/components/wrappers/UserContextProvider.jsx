"use client";

import { useEffect } from "react";
import { createContext } from "react";
import User from "../../store/user-store";

export const userStore = new User();

export const UserContext = createContext(userStore);

export default function UserContextProvider({ children }) {
    useEffect(() => {
        userStore.aboutUser();
    }, []);
    return (
        <UserContext.Provider value={userStore}>
            {children}
        </UserContext.Provider>
    );
}
