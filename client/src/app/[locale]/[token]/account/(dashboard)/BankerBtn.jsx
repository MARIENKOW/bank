import { Button } from "@mui/material";
import SiteService from "../../../../../services/SiteService";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const site = new SiteService();

export default function BankerBtn() {
    const [bankerNumber, setBankerNumber] = useState(false);

    const t = useTranslations();

    useEffect(() => {
        async function getNumber() {
            try {
                const { data } = await site.getBanker();
                setBankerNumber(data);
            } catch (error) {
                console.log(error);
            }
        }
        getNumber();
    }, []);

    if (!bankerNumber) return "";
    return (
        <Link href={'tel:'+bankerNumber} >
            <Button sx={{ color: "#000" }} color="error" variant="contained">
                {t("pages.account.buttons.banker")}
            </Button>
        </Link>
    );
}
