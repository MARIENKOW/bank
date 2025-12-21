import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

export const Subtitile = ({ text }) => {
    return (
        <Typography
            mb={3}
            mr={1}
            textTransform={"uppercase"}
            variant="body1"
            textAlign={"right"}
            fontSize={"32"}
            fontWeight={"700"}
            color="secondary.main"
        >
            {text}
        </Typography>
    );
};
