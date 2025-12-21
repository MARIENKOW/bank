"use client";
import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";

export const StyledLink = styled(Typography)(({ theme, variant }) => ({
    ...theme,
    color:
        variant === "black"
            ? theme.palette.secondary.contrastText
            : theme.palette.secondary.main,
    display: "flex",
    alignItems: "center",
    fontWeight: 600,

    "&:hover": {
        color: variant === "black" ? "#979797" : theme.palette.secondary.light,
    },
}));
