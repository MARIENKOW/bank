import { Link } from "../../../../i18n/navigation";
import CurrencyRates from "../../../../components/CurrencyRate";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import { getTranslations } from "next-intl/server";
import { Box, Button, Typography } from "@mui/material";
import { SIGNIN_ROUTE } from "../../../../configs/routerLinks";
import PhonesMain from "../../../../components/PhonesMain";

export default async function Page({ params }) {
    const t = await getTranslations("pages.main");
    const { token } = await params;

    return (
        <ContainerComponent>
            <Box mt={30} mb={7}>
                <Link href={SIGNIN_ROUTE(token)}>
                    <Button fullWidth variant="contained" size="large">
                        {t("buttons.signin")}
                    </Button>
                </Link>
            </Box>
            <Typography
                variant="body1"
                fontWeight={600}
                fontSize={16}
                color="initial"
                mb={7}
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Pariatur mollitia sapiente repudiandae illo nemo debitis ullam
                qui in. Necessitatibus, temporibus quae eligendi odit doloremque
                tempore veritatis, impedit praesentium blanditiis dolorem
                reiciendis sed harum suscipit explicabo iste odio! Debitis vel
                molestias assumenda dolore itaque pariatur culpa iusto rem
                earum, ipsam ullam?
            </Typography>
            <Box
                gap={{ xs: 0, md: 3 }}
                flexDirection={{ xs: "column", md: "row" }}
                display={"flex"}
            >
                <Box flex={"50%"} mb={7}>
                    <CurrencyRates />
                </Box>
                <Box flex={"50%"} mb={7}>
                    <PhonesMain />
                </Box>
            </Box>
        </ContainerComponent>
    );
}
