"use client";

import Loading from "../loading/Loading";
import { observer } from "mobx-react-lite";
import SignInAdmin from "../../app/[locale]/admin/(dashboard)/SignInAdmin";
import { useContext, useEffect } from "react";
import { AdminContext } from "./AdminContextProvider";
import ErrorElement from "../../components/ErrorElement";

function ChechAuthAdmin({ children }) {
    const { isAuth, isLoading } = useContext(AdminContext);

    console.log(isLoading);

    if (isLoading) return <Loading />;
    if (!isLoading && isAuth === null) return <ErrorElement admin={true} />;
    if (!isAuth) return <SignInAdmin />;

    return children;
}

export default observer(ChechAuthAdmin);
