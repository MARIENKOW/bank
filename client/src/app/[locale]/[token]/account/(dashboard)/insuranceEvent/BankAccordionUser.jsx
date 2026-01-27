import { Box, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "../../../../../../i18n/navigation";
import { ACCOUNT_BANK_ROUTE } from "../../../../../../configs/routerLinks";
import { useParams } from "next/navigation";
import EventsInsuranceUser from "./EventsInsuranceUser";

export default function BankAccordion({ item, user }) {
    const { token } = useParams();
    const t = useTranslations();
    return (
        <Box>
            <Accordion
                sx={{
                    "& .MuiPaper-root": {},
                    bgcolor: "primary",
                }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color={"secondary"} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography
                        fontSize={12}
                        textTransform={"uppercase"}
                        component="span"
                        color={"secondary"}
                        fontWeight={500}
                    >
                        {item?.name}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "secondary.main" }}>
                    <Box display={"flex"} flexDirection={"column"} gap={1}>
                        <Box
                            display={"inline-flex"}
                            flexDirection={"column"}
                            gap={0.5}
                            pt={1}
                            pb={1}
                        >
                            <Typography lineHeight={"1"} variant="body1">
                                {t("pages.account.bank.elc")}
                            </Typography>
                            <Typography
                                fontSize={16}
                                fontWeight={600}
                                variant="body1"
                            >
                                {item?.elc}
                            </Typography>
                        </Box>

                        <EventsInsuranceUser id={item.id} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
