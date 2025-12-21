'use client'

import { Box, useTheme } from "@mui/material";

export default function ImgBG() {
    const theme = useTheme()
    return (
        <Box
            className={"rmUserSelect"}
            bgcolor={theme.palette.primary.main}
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
        >
            <Box
                className={"rmUserSelect"}
                sx={{
                    position: "relative",
                    height: "100%",
                    overflow: "hidden",
                }}
            >
                <Box
                    className={"rmUserSelect"}
                    sx={{
                        width: "100%",
                        height: "100%",
                        //   aspectRatio: "2.5/1",
                        //   objectFit: "cover",
                        opacity: "0.5",
                    }}
                    component={"img"}
                    src={"/banner2.jpg"}
                ></Box>
                {/* <Box
               className={"rmUserSelect"}
               sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  pointerEvents: "none",
                  height: "100%",
                  background: `linear-gradient(transparent,#fff)`,
               }}
            ></Box> */}
            </Box>
        </Box>
    );
}
