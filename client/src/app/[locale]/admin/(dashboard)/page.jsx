import { Box, Button } from "@mui/material";
import Link from "next/link";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import {
    ADMIN_ACCESS_ROUTE,
    ADMIN_PHONE_ROUTE,
    ADMIN_USERS_ROUTE,
} from "../../../../configs/routerLinks";

export default function Page() {
    return (
        <ContainerComponent
            sx={{
                flex: 1,
                display: "flex",
                alingItems: "center",
                justifyContent: "center",
                flexDirection: "row",
            }}
        >
            <Box
                flex={"0 1 400px"}
                display={"flex"}
                gap={4}
                justifyContent={"center"}
                flexDirection={"column"}
            >
                <Link href={ADMIN_USERS_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        Клиенты
                    </Button>
                </Link>
                <Link href={ADMIN_ACCESS_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        Доступ
                    </Button>
                </Link>
                <Link href={ADMIN_PHONE_ROUTE}>
                    <Button fullWidth variant="contained" color="primary">
                        Контакты
                    </Button>
                </Link>
            </Box>
        </ContainerComponent>
    );
}
