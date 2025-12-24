import PhoneService from "../../../../../services/PhoneService";
import { PhonesClient } from "../../../../../components/phone/PhonesClient";
import {
    BottomNavigation,
    BottomNavigationAction,
    Box,
    IconButton,
    Paper,
    Typography,
} from "@mui/material";
import PhoneAdd from "../../../../../components/phone/PhoneAdd";
import { ContainerComponent } from "../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../components/BreadcrumbsComponent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Link from "next/link";
import {
    ADMIN_PHONE_BANKER_ROUTE,
    ADMIN_PHONE_WHATSUP_ROUTE,
} from "../../../../../configs/routerLinks";

export const dynamic = "force-dynamic";

const phone = new PhoneService();

export default async function Page() {
    let initialData;
    let initialError;
    try {
        const { data } = await phone.getPhones();
        initialData = data;
    } catch (error) {
        console.log(error);
        initialError = error;
    }

    return (
        <ContainerComponent>
            <Box mb={3} justifyContent={"space-between"} display={"flex"}>
                <BreadcrumbsComponent
                    options={[{ name: "контакты" }]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            padding: "5px 15px",
                        },
                    }}
                />
                <PhoneAdd />
            </Box>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={1}
                flexDirection={"column"}
                flex={1}
            >
                <PhonesClient
                    initialError={initialError}
                    initialData={initialData}
                />
            </Box>
        </ContainerComponent>
    );
}

// async function PhonesInner() {
//     try {
//         const { data } = await phone.getPhones();

//         return <PhonesClient initialError={initialError} initialData={initialData} />
//     } catch (error) {
//         console.log(error);
//         return <ErrorElement />;
//     }
// }
