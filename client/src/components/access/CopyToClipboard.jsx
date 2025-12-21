import React, { useRef, useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {
   Box,
   Button,
   Paper,
   Tooltip,
   Typography,
   useTheme,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

export const CopyToClipboard = ({ text ,type='link'}) => {
   const theme = useTheme();
   const textRef = useRef();

   const handleCopy = async () => {
      try {
         {
            // textRef.current.focus();
            console.log(textRef);
            textRef.current.select();
            document.execCommand("copy");
            enqueueSnackbar(`${type} copy to clipboard`,{variant:'success'})
         }
      } catch (err) {
         console.error("Failed to copy text: ", err);
         enqueueSnackbar('failed to copy text',{variant:'error'})

      }
   };

   return (
      <Box
         sx={{
            width:'100%',
            display: "flex",
            // alignItems: "center",
            background: "transparent",
            borderWidth:'2px',
            borderStyle:'solid',
            borderColor:theme.palette.primary,
            borderRadius:'6px'
         }}
      >
         <Typography
            ref={textRef}
            sx={{
               borderWidth: "1px",
               borderStyle: "solid",

               borderColor: theme.palette.background.light,
               borderRadius: "10px",
               background: "transparent",
               color: theme.palette.secondary.contrastText,
               overflowX: "scroll",
               userSelect: "all",
               whiteSpace: "nowrap",
               display:'inline-block',
               flex:1,
               width:0,
            //    width:0,
            //    width:'100px',
               // "&::-webkit-scrollbar": {
               //    display: "none",
               // },
            }}
            flex={1}
            component={"input"}
            border={'0px solid #fff'}
            type="text"
            pb={1}
            pt={1}
            pr={1}
            pl={1}
            value={text}
            readOnly
            rows={1}
         >
         </Typography>
         <Tooltip title="Copy to clipboard">
            <Button onClick={handleCopy} sx={{ minWidth: "40px" }}>
               <ContentCopyIcon
                  color="primary"
                  fontSize="large"
                  sx={{ height: "20px" }}
               />
            </Button>
         </Tooltip>
      </Box>
   );
};

export default CopyToClipboard;
