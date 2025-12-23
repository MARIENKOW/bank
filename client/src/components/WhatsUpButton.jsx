import { Box, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SiteService from "../services/SiteService";

const site = new SiteService();

export default async function WhatsUpButton() {
    try {
        const { data } = await site.getWhatsUp();

        if (!data) return "";

        return (
            <Box
                zIndex={1000}
                display={"inline-flex"}
                position={"fixed"}
                left={10}
                bottom={30}
            >
                <Box component={"a"} href={data}>
                    <IconButton>
                        <WhatsAppIcon
                            color="dif"
                            sx={{ width: 50, height: 50 }}
                        />
                    </IconButton>
                </Box>
            </Box>
        );
    } catch (error) {
        console.log(error);
        return "";
    }
}
