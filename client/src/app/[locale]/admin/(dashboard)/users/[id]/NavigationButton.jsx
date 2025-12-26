import Link from "next/link";
import {
    ADMIN_USER_CREDIT_ROUTE,
    ADMIN_USER_EVENT_INSURANCE_ROUTE,
} from "../../../../../../configs/routerLinks";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { MenuItem, Menu } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRef, useState } from "react";

export default function NavigationButton({ id }) {
    const anchorEl = useRef();
    const [open, setOpen] = useState(false);

    const handleOpenNavMenu = (event) => {
        setOpen(true);
        event.stopPropagation();
        event.preventDefault();
    };

    const handleCloseNavMenu = (event) => {
        setOpen(false);
        // event.preventDefault();
        event.stopPropagation();
    };
    return (
        <>
            <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="primary"
                ref={anchorEl}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                open={open}
                onClose={handleCloseNavMenu}
                anchorEl={anchorEl.current}
                sx={{
                    "& .MuiPaper-root": { bgcolor: "#fff" },
                    paddingBottom: 0,
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Link href={ADMIN_USER_EVENT_INSURANCE_ROUTE(id)}>
                    <MenuItem
                        onClick={(event) => {
                            handleCloseNavMenu(event);
                        }}
                    >
                        <Typography
                            width={"100%"}
                            textAlign="right"
                            textTransform="capitalize"
                        >
                            Страховочные зачисления
                        </Typography>
                    </MenuItem>
                </Link>
                <Link href={ADMIN_USER_CREDIT_ROUTE(id)}>
                    <MenuItem
                        onClick={(event) => {
                            handleCloseNavMenu(event);
                        }}
                    >
                        <Typography
                            width={"100%"}
                            textAlign="right"
                            textTransform="capitalize"
                        >
                            Кредиты
                        </Typography>
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );
}
