import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "../../i18n/navigation";
import { UserContext } from "../../components/wrappers/UserContextProvider";
import { ACCOUNT_ROUTE } from "../../configs/routerLinks";
import { useParams } from "next/navigation";
import Loading from "../../components/loading/Loading";

export function RedirectTo({ to }) {
    const router = useRouter();
    useEffect(() => {
        router.replace(to);
    }, [to, router]);
    return null;
}

function OnlyLogoutUser({ children }) {
    const { isLoading, isAuth } = useContext(UserContext);
    const { token } = useParams();

    const router = useRouter();

    if (isLoading) return <Loading />;

    if (isAuth === false) return children;

    return <RedirectTo to={ACCOUNT_ROUTE(token)} />;
}

export default observer(OnlyLogoutUser);
