import { Box, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function WhatsUpButton() {
    return (
        <Box display={"inline-flex"} position={"fixed"} left={10} bottom={60}>
            <IconButton>
                <WhatsAppIcon sx={{ width: 50, height: 50, fill: "#00c853" }} />
            </IconButton>
        </Box>
    );
}
