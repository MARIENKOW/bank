import { Box } from "@mui/material";
import HeaderUser from "../../../../../components/HeaderUser";
import ImgBG2 from "../../../../../components/ImgBG2";

export default function Layout({ children }) {
    return (
        <>
            <HeaderUser />
            <Box
                position={"relative"}
                zIndex={1}
                flex={1}
                display={"flex"}
                flexDirection={"column"}
            >
                <ImgBG2 />
                <Box position={'relative'}zIndex={3} >
                    {children}
                </Box>
            </Box>
        </>
    );
}
