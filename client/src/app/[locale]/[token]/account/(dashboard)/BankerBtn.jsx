import { Box, Button } from "@mui/material";
import SiteService from "../../../../../services/SiteService";
import { useContext } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { UserContext } from "../../../../../components/wrappers/UserContextProvider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function BankerBtn() {
    const { user } = useContext(UserContext);
    const t = useTranslations();
    // user?.banker_number
    return (
        <Box maxWidth={500}>
            <Accordion
                sx={{
                    "& .MuiPaper-root": {},
                    bgcolor: "primary.main",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        fontSize={12}
                        textTransform={"uppercase"}
                        component="span"
                        fontWeight={500}
                        color='secondary'
                    >
                        {t("pages.account.buttons.banker")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "secondary.main" }}>
                    <Box>
                        <Box gap={2} alignItems={"center"} display={"flex"}>
                            <Box
                                component={"img"}
                                sx={{ aspectRatio: "1/1" }}
                                borderRadius={999}
                                width={100}
                                src={
                                    user?.img?.path || "/defaultPersonLogo.jpg"
                                }
                            />
                            <Box>
                                <Box
                                    display={"inline-flex"}
                                    flexDirection={"column"}
                                    gap={0.5}
                                    pt={1}
                                    pb={1}
                                >
                                    <Typography
                                        lineHeight={"1"}
                                        variant="body1"
                                    >
                                        {t("pages.account.banker.name")}
                                    </Typography>
                                    <Typography
                                        fontSize={16}
                                        fontWeight={600}
                                        variant="body1"
                                    >
                                        {user?.banker_name}
                                    </Typography>
                                </Box>
                                <Box display={"flex"}>
                                    <Box
                                        display={"inline-flex"}
                                        flexDirection={"column"}
                                        gap={0.5}
                                        pt={1}
                                        pb={1}
                                    >
                                        <Typography
                                            lineHeight={"1"}
                                            variant="body1"
                                        >
                                            {t("pages.account.banker.job")}
                                        </Typography>
                                        <Typography
                                            fontSize={16}
                                            fontWeight={600}
                                            variant="body1"
                                        >
                                            {user?.banker_job}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    display={"inline-flex"}
                                    flexDirection={"column"}
                                    gap={0.5}
                                    pt={1}
                                    pb={1}
                                >
                                    <Typography
                                        lineHeight={"1"}
                                        variant="body1"
                                    >
                                        {t("pages.account.banker.phone")}
                                    </Typography>
                                    <Typography
                                        fontSize={16}
                                        fontWeight={600}
                                        variant="body1"
                                    >
                                        {user?.banker_phone}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Link target='_blank' href={user?.banker_whatsup||''}>
                            <Button
                                sx={{ mt: 2 ,color:'#fff'}}
                                fullWidth
                                variant="contained"
                            >
                                {t("pages.account.banker.whatsup")}
                            </Button>
                        </Link>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
