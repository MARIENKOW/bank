import { Box, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsUpButton() {
    return (
        <Box zIndex={1000} display={"inline-flex"} position={"fixed"} left={10} bottom={30}>
            <IconButton>
                <WhatsAppIcon color="dif" sx={{ width: 50, height: 50,  }} />
            </IconButton>
        </Box>
    );
}
