import { Link } from "../../../../i18n/navigation";
import CurrencyRates from "../../../../components/CurrencyRate";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import { getTranslations } from "next-intl/server";
import { Box, Button, Typography } from "@mui/material";
import { SIGNIN_ROUTE } from "../../../../configs/routerLinks";
import PhonesMain from "../../../../components/PhonesMain";
import ImgBG from "../../../../components/ImgBG";
import zIndex from "@mui/material/styles/zIndex";

export default async function Page({ params }) {
    const t = await getTranslations("pages.main");
    const tM = await getTranslations();
    const { token } = await params;

    return (
        <Box
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
            flex={1}
        >
            <Box
                display={"flex"}
                flexDirection={"column"}
                flex={1}
                position={"relative"}
                zIndex={2}
            >
                <Box position={"relative"} pb={7}>
                    <ImgBG />
                    <Typography
                        position={"relative"}
                        zIndex={2}
                        letterSpacing={1}
                        fontSize={{ xs: 38, md: 48 }}
                        mb={13}
                        mt={13}
                        textAlign={"center"}
                        textTransform={"uppercase"}
                        fontWeight={800}
                        variant="h2"
                        color="primary"
                    >
                        {tM("name")}
                    </Typography>
                    <ContainerComponent
                        sx={{ position: "relative", zIndex: 2 }}
                    >
                        <Link href={SIGNIN_ROUTE(token)}>
                            <Button fullWidth variant="contained" size="large">
                                {t("buttons.signin")}
                            </Button>
                        </Link>
                    </ContainerComponent>
                </Box>
                <Box pb={3} pt={3}  bgcolor={'background.paper'} >
                    <ContainerComponent>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize={16}
                            color={'secondary'}
                            // mb={7}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Pariatur mollitia sapiente repudiandae illo
                            nemo debitis ullam qui in. Necessitatibus,
                            temporibus quae eligendi odit doloremque tempore
                            veritatis, impedit praesentium blanditiis dolorem
                            reiciendis sed harum suscipit explicabo iste odio!
                            Debitis vel molestias assumenda dolore itaque
                            pariatur culpa iusto rem earum, ipsam ullam?
                        </Typography>
                    </ContainerComponent>
                </Box>
                <ContainerComponent>
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
            </Box>
        </Box>
    );
}
