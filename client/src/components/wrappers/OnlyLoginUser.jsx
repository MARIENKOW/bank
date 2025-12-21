"use client";

import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { SIGNIN_ROUTE } from "../../configs/routerLinks";
import Loading from "../../components/loading/Loading";
import { UserContext } from "../../components/wrappers/UserContextProvider";
import { useRouter } from "../../i18n/navigation";
import { useParams } from "next/navigation";

function OnlyLogoutUser({ children }) {
    const { isAuth, isLoading } = useContext(UserContext);
    const { token } = useParams();
    const router = useRouter();

    if (isLoading) return <Loading />;

    if (isAuth === true) return children;

    return router.replace(SIGNIN_ROUTE(token));
}

export default observer(OnlyLogoutUser);
