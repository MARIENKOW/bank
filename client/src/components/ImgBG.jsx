import { Box } from "@mui/material";
import img from "../img/main.png";

export default function ImgBG() {
    return (
        <Box
            className={"rmUserSelect"}
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
                        opacity: "1",
                    }}
                    component={"img"}
                    src={img.src}
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
