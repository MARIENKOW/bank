import { Box, Typography } from "@mui/material";
import { Empty } from "../../../../../../../components/Empty";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CreditAccordion({ data, InnerComponent, label }) {
    return (
        <Accordion
            sx={{
                "& .MuiPaper-root": {},
                bgcolor: "primary.main",
            }}
            defaultExpanded
        >
            <AccordionSummary expandIcon={<ExpandMoreIcon color="secondary" />}>
                <Typography variant="body1" color="secondary">
                    {label}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "secondary.main" }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        p: 1,
                        maxHeight: 350,
                        overflowY: "scroll",
                    }}
                >
                    {data && data?.length !== 0 ? (
                        data?.map((credit) => (
                            <InnerComponent key={credit.id} credit={credit} />
                        ))
                    ) : (
                        <Empty admin={true} />
                    )}
                </Box>
            </AccordionDetails>
        </Accordion>
    );
}
