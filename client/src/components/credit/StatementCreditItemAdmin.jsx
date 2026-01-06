import { StyledLoadingButton } from "../form/StyledLoadingButton";
import formatDate from "../../helpers/formatDate";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import { useTranslations } from "next-intl";

import DeleteCreditButton from "./ActionBtns/DeleteCreditButton";
import CancelCreditButton from "./ActionBtns/CancelCreditButton";
import AproveCreditButton from "./ActionBtns/AproveCreditButton";
import InfoCreditButton from "./ActionBtns/InfoCreditButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef, useState } from "react";

export default function StatementCreditItemAdmin({ credit }) {
    const ref = useRef();
    const t = useTranslations();
    const [open, setOpen] = useState(false);

    const commentString = credit?.comment || "";
    const bankString = credit?.bank || "";
    const elcString = credit?.elc || "";

    const comment = commentString + " " + bankString + " " + elcString;

    return (
        <Paper sx={{ bgcolor: "#ddd" }} variant="elevation">
            <Box
                justifyContent={"space-between"}
                display={"flex"}
                alignItems={"center"}
                p={1}
                gap={2}
            >
                <Box display={"flex"} alignItems={"center"} gap={2}>
                    <Typography fontWeight={500} variant="body1">
                        {formatDate(credit.date)}
                    </Typography>
                    {/* <Typography fontSize={12} fontWeight={400} variant="body1">
                        {comment}
                    </Typography> */}
                </Box>
                <Box display={"flex"} gap={1} alignItems={"center"}>
                    <Typography
                        fontWeight={500}
                        color={"success"}
                        variant="body1"
                    >
                        {t("currency", { value: credit?.sum })}
                    </Typography>
                    <Box display={"flex"} gap={1}>
                        <IconButton onClick={() => setOpen(true)} ref={ref}>
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            open={open}
                            onClose={() => setOpen(false)}
                            anchorEl={ref.current}
                        >
                            <MenuItem>
                                <AproveCreditButton credit={credit} />
                            </MenuItem>
                            <MenuItem>
                                <CancelCreditButton credit={credit} />
                            </MenuItem>
                            <MenuItem>
                                <DeleteCreditButton credit={credit} />
                            </MenuItem>
                        </Menu>
                        <InfoCreditButton credit={credit} />
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
}
