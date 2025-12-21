import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SizeButton({ editor }) {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        editor
            .chain()
            .focus()
            .toggleHeading({ level: event.target.value })
            .run();
        setAge(event.target.value);
    };

    React.useEffect(() => {
        setAge(editor?.getAttributes("heading")?.level || "");
    }, [editor?.getAttributes("heading")?.level]);

    return (
        <Box display={"inline-block"} sx={{ minWidth: 70 }}>
            <FormControl
                size="small"
                sx={{ display: "inline-block", minWidth: 70 }}
                fullWidth
            >
                <InputLabel id="demo-simple-select-label-size">Size</InputLabel>
                <Select
                    labelId="demo-simple-select-label-size"
                    id="demo-simple-select-size"
                    value={age}
                    sx={{ width: "100%" }}
                    label="Size"
                    // displayEmpty
                    onChange={handleChange}
                >
                    <MenuItem value={6}>h6</MenuItem>
                    <MenuItem value={5}>h5</MenuItem>
                    <MenuItem value={4}>h4</MenuItem>
                    <MenuItem value={3}>h3</MenuItem>
                    <MenuItem value={2}>h2</MenuItem>
                    <MenuItem value={1}>h1</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
