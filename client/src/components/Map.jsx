"use client";

import { Box, useTheme } from "@mui/material";
import { ContainerComponent } from "./wrappers/ContainerComponent";

export const Map = () => {
    const theme = useTheme();
    return (
        <Box sx={{ bgcolor:' theme.palette.primary.contrastText' }}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3384.756404776665!2d34.8988975!3d31.9675046!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502cae44210920d%3A0x5be5b0f55288efa2!2sLahav%20433!5e0!3m2!1sru!2snl!4v1760010118173!5m2!1sru!2snl"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
        </Box>
    );
};
