import { Box } from "@mui/system";
import ImgBG from "../../../../components/ImgBG";
import { Footer } from "../../../../components/Footer";
import { HeaderWrapper } from "../../../../components/HeaderWrapper";
import { Map } from "../../../../components/Map";
import { MainWrapper } from "../../../../components/wrappers/MainWrapper";
import { inter, montserrat } from "../../../../fonts/index";
import config from "../../../../configs/config";
import AccessService from "../../../../services/AccessService";
import ErrorPage from "../../../../components/pages/ErrorPage";
import RedirectToGoogle from "../../../../components/events/RedirectToGoogle";
import UserContextProvider from "../../../../components/wrappers/UserContextProvider";
import WhatsUpButton from "../../../../components/WhatsUpButton";
import { getLocale } from "next-intl/server";


const image = config.SERVER_API + "/meta/metaLogo.png";
export const metadata = {
    title: "Bank of Israel",
    description: "",
    openGraph: {
        images: [image],
    },
};

const access = new AccessService();

export default async function Layout({ children, params }) {
    const { token } = await params;
    const locale = await getLocale();

    console.log(token);
    if (!token) return <RedirectToGoogle />;

    try {
        const { data } = await access.checkToken(token);
        if (!data) return <RedirectToGoogle />;

        return (
            <html dir={locale=='il'?"rtl":''} className={montserrat.className} lang="ru">
                <body style={{ background: "#2e3d50" }}>
                    <UserContextProvider>
                        <MainWrapper>
                            <Box
                                position={"relative"}
                                flex={1}
                                bgcolor={"#fff"}
                                display={"flex"}
                                flexDirection={"column"}
                                overflow={"hidden"}
                            >
                                {/* <ImgBG /> */}
                                <HeaderWrapper />
                                {/* <Header data={[{number:+99288294440},{number:+99288294440},{number:+99288294440}]} /> */}
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    flex={1}
                                    position={"relative"}
                                    zIndex={"10 "}
                                >
                                    {children}
                                    {/* <SendForm/> */}
                                    {/* <Map /> */}
                                    <WhatsUpButton />
                                </Box>
                                <Footer />
                            </Box>
                        </MainWrapper>
                    </UserContextProvider>
                </body>
            </html>
        );
    } catch (error) {
        console.log(error);
        return <ErrorPage />;
    }
}
