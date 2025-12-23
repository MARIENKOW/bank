import { Box } from "@mui/material";
import { ContainerComponent } from "../../../../../../components/wrappers/ContainerComponent";
import BreadcrumbsComponent from "../../../../../../components/BreadcrumbsComponent";
import SiteService from "../../../../../../services/SiteService";
import { ADMIN_PHONE_ROUTE } from "../../../../../../configs/routerLinks";
import { BankerClient } from "../../../../../../components/phone/BankerClient";

export const dynamic = "force-dynamic";

const site = new SiteService();

export default async function Page() {
    let initialData;
    let initialError;
    try {
        const { data } = await site.getBanker();
        initialData = data;
    } catch (error) {
        console.log(error);
        initialError = error;
    }

    return (
        <ContainerComponent>
            <Box mb={3} justifyContent={"space-between"} display={"flex"}>
                <BreadcrumbsComponent
                    options={[
                        { name: "контакты", link: ADMIN_PHONE_ROUTE },
                        { name: "Связь с банкиром" },
                    ]}
                    sx={{
                        ol: {
                            borderRadius: 2,
                            display: "inline-flex",
                            padding: "5px 15px",
                        },
                    }}
                />
            </Box>
            <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"column"}
                flex={1}
            >
                <BankerClient
                    initialError={initialError}
                    initialData={initialData}
                />
            </Box>
        </ContainerComponent>
    );
}
