import { Box } from "@mui/material";

export default function ImgBG2() {
    return (
        <Box
            className={"rmUserSelect"}
            sx={{
                position: "absolute",
                zIndex: 2,
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
                    maxHeight: "100%",
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
                        objectFit: "cover",
                        opacity: "0.2",
                    }}
                    component={"img"}
                    src={"/acc/2.avif"}
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
