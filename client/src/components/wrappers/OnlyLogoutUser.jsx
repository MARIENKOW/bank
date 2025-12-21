import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { useRouter } from "../../i18n/navigation";
import { UserContext } from "../../components/wrappers/UserContextProvider";
import { ACCOUNT_ROUTE } from "../../configs/routerLinks";
import { useParams } from "next/navigation";
import Loading from "../../components/loading/Loading";

function OnlyLogoutUser({ children }) {
    const { isLoading, isAuth } = useContext(UserContext);
    const { token } = useParams();

    const router = useRouter();

    if (isLoading) return <Loading />;

    if (isAuth === false) return children;

    return router.replace(ACCOUNT_ROUTE(token));
}

export default observer(OnlyLogoutUser);
