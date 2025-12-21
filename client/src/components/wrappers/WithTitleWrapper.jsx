import { Box, Typography } from "@mui/material";
import Image from "next/image";

export default function WithTitleWrapper({
    title,
    subtitle,
    imgSrc,
    children,
}) {
    return (
        <>
            <Box mt={10}>
                <Box
                    flex={1}
                    gap={5}
                    mb={15}
                    display={"flex"}
                    flexDirection={"column"}
                >
                    <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        flexDirection={{xs:'column-reverse',md:'row'}}
                        gap={3}
                    >
                        <Typography
                            textAlign={"center"}
                            fontWeight={"600"}
                            variant="h3"
                            color="primary.contrastText"
                            sx={{ fontSize: { xs: "38px", md: "46px" } }}
                        >
                            {title}
                        </Typography>
                        {/* <Box component={"img"} src="/logo.png" /> */}
                        {imgSrc && (
                            <Image
                                alt="title-img"
                                src={imgSrc}
                                width={"100"}
                                height={"100"}
                            />
                        )}
                    </Box>
                    <Typography
                        pr={2}
                        pl={2}
                        textAlign={"center"}
                        fontWeight={"600"}
                        variant="h5"
                        color="primary.contrastText"
                        sx={{ fontSize: { xs: "24px", md: "32px" } }}
                    >
                        {subtitle}
                    </Typography>
                </Box>
                {children}
            </Box>
        </>
    );
}
