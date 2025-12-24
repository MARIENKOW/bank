import { Link } from "../../../../i18n/navigation";
import CurrencyRates from "../../../../components/CurrencyRate";
import { ContainerComponent } from "../../../../components/wrappers/ContainerComponent";
import { getTranslations } from "next-intl/server";
import { Box, Button, Divider, Typography } from "@mui/material";
import { SIGNIN_ROUTE } from "../../../../configs/routerLinks";
import PhonesMain from "../../../../components/PhonesMain";
import ImgBG from "../../../../components/ImgBG";
import zIndex from "@mui/material/styles/zIndex";
import Blogs from "../../../../components/blog/Blogs";
import { BlogsUser } from "../../../../components/blog/BlogsUser";

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
                <Box position={"relative"}>
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
                    {/* <ContainerComponent
                        sx={{ position: "relative", zIndex: 2 }}
                    >
                        <Link href={SIGNIN_ROUTE(token)}>
                            <Button fullWidth variant="contained" size="large">
                                {t("buttons.signin")}
                            </Button>
                        </Link>
                    </ContainerComponent> */}
                </Box>
                <Box pb={3} pt={3} bgcolor={"background.paper"}>
                    <ContainerComponent>
                        <Typography
                            variant="body1"
                            fontWeight={700}
                            fontSize={17}
                            textAlign={"center"}
                            color={"secondary"}
                            // mb={7}
                        >
                            {t("blocks.top.title")}
                        </Typography>
                        <Typography
                            variant="body1"
                            fontWeight={400}
                            textAlign={"center"}
                            fontSize={16}
                            color={"secondary"}
                            mt={2}
                        >
                            {t("blocks.top.subtitle")}
                        </Typography>
                    </ContainerComponent>
                </Box>
                <Box pb={3} pt={3} bgcolor={"primary.main"}>
                    <ContainerComponent>
                        <Box gap={5} display={"flex"}>
                            <Box
                                flex={"50%"}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"end"}
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    fontWeight={400}
                                    fontSize={40}
                                    color={"secondary"}
                                    // mb={7}
                                >
                                    {t("blocks.top.left.percent")}
                                </Typography>
                                <Divider
                                    sx={{
                                        height: 1.5,
                                        bgcolor: "primary.light",
                                        width: "100%",
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    fontWeight={700}
                                    fontSize={17}
                                    textAlign={"center"}
                                    color={"secondary"}
                                    // mb={7}
                                >
                                    {t("blocks.top.left.text")}
                                </Typography>
                            </Box>
                            <Box
                                flex={"50%"}
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"start"}
                                gap={1}
                            >
                                <Typography
                                    variant="body1"
                                    fontWeight={400}
                                    fontSize={40}
                                    color={"secondary"}
                                    // mb={7}
                                >
                                    {t("blocks.top.right.percent")}
                                </Typography>
                                <Divider
                                    sx={{
                                        height: 1.5,
                                        bgcolor: "primary.light",
                                        width: "100%",
                                    }}
                                />
                                <Typography
                                    variant="body1"
                                    fontWeight={700}
                                    fontSize={17}
                                    color={"secondary"}
                                    textAlign={"center"}
                                    // mb={7}
                                >
                                    {t("blocks.top.right.text")}
                                </Typography>
                            </Box>
                        </Box>
                    </ContainerComponent>
                </Box>

                <Box
                    display={"flex"}
                    flexDirection={{ xs: "column", md: "row" }}
                >
                    <Box
                        flex={"50%"}
                        maxHeight={290}
                        width={{ xs: "100%", md: "50%" }}
                        sx={{ objectFit: "cover" }}
                        component={"img"}
                        src="/mainLion.png"
                    />
                    <Box
                        maxHeight={290}
                        flex={"50%"}
                        // width={"100%"}
                        width={{ xs: "100%", md: "50%" }}
                        sx={{ objectFit: "cover" }}
                        component={"img"}
                        src="/mainPer.png"
                    />
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
                            <Typography mb={2} variant="h6" gutterBottom>
                                {t("blocks.gra.name")}
                            </Typography>
                            <Box
                                sx={{ objectFit: "contain", width: "100%" }}
                                component={"img"}
                                src={"/gra.png"}
                            />
                        </Box>
                    </Box>
                    <BlogsUser token={token} />
                    <PhonesMain />
                </ContainerComponent>
            </Box>
        </Box>
    );
}
