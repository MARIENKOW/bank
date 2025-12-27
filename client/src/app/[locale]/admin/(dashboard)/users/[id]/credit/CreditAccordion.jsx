import { Box, Typography } from "@mui/material";
import { Empty } from "../../../../../../../components/Empty";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CreditAccordion({ data, InnerComponent, label,user }) {
    return (
        <Accordion
            sx={{
                "& .MuiPaper-root": {},
                bgcolor: user?"error.main":"primary.main",
            }}
            defaultExpanded
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                <Typography variant="body1" color="secondary">
                    {label}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fff",p:0 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: user?0:1,
                        p: 1,
                        maxHeight: 350,
                        overflowY: "scroll",
                    }}
                >
                    {data && data?.length !== 0 ? (
                        data?.map((credit,i) => (
                            <InnerComponent i={i} key={credit.id} credit={credit} />
                        ))
                    ) : (
                        <Empty admin={!user} />
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
