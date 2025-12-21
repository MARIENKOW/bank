'use client'

import { Button, useTheme } from "@mui/material";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { ContainerComponent } from "./wrappers/ContainerComponent";
import { AdminContext } from "./wrappers/AdminContextProvider";

const HeaderAdmin = () => {
   const { logOut } = useContext(AdminContext);

   const theme = useTheme()

   return (
      <Box mb={2}>
         <AppBar  position="static">
            <ContainerComponent sx={{ p: { xs: 0 } }}>
               <Toolbar
                  sx={{
                     display: "flex",
                     justifyContent: "end",
                     alignItems: "center",
                     gap: 3,
                  }}
               >
                  <Button startIcon={<LogoutIcon />} color='secondary' variant='outlined' onClick={logOut}>
                     Выход
                  </Button>
               </Toolbar>
            </ContainerComponent>
         </AppBar>
      </Box>
   );
};

export default HeaderAdmin;
