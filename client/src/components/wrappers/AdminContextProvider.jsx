"use client";
import { useEffect } from "react";
import Admin from "../../store/admin-store";
import { createContext, useState } from "react";

export const adminStore = new Admin();

export const AdminContext = createContext(adminStore);

export default function AdminContextProvider({ children }) {
    useEffect(() => {
        adminStore.aboutAdmin();
    }, []);
    return (
        <AdminContext.Provider value={adminStore}>
            {children}
        </AdminContext.Provider>
    );
}
