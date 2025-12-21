import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import PhoneService from "../services/PhoneService";
import { getTranslations } from "next-intl/server";
import PhoneIcon from "@mui/icons-material/Phone";
import React from "react";

const phone = new PhoneService();

export default async function () {
    const t = await getTranslations();
    try {
        const { data } = await phone.getPhones();
        if (!data || data.length === 0) return "";

        return (
            <Box>
                <Typography variant="h6" mb={2} >
                    {t("pages.main.phones")}
                </Typography>
                <Box  >
                    <List sx={{flex:'0 1 500px',p:0}}>
                        {data.map((el) => (
                            <React.Fragment key={el.id}>
                                <ListItem
                                    component={"a"}
                                    href={"tel:" + el.number}
                                    
                                    disablePadding
                                    sx={{ bgcolor: "primary.main" }}
                                >
                                    <ListItemButton>
                                        {/* <ListItemIcon>
                                    </ListItemIcon> */}
                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <PhoneIcon
                                                color="secondary"
                                                fontSize="medium"
                                            />
                                            <Typography
                                                variant="body1"
                                                fontWeight={500}
                                                color="secondary"
                                            >
                                                {el.number}
                                            </Typography>
                                        </Box>
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>
                </Box>
            </Box>
        );
    } catch (error) {
        console.log(error);
        return "";
    }
}
