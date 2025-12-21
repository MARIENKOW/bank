import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FontsButton({ editor }) {
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        if (event.target.value === "Default") {
            editor.chain().focus().unsetFontFamily().run();
        } else {
            editor.chain().focus().setFontFamily(event.target.value).run();
        }
        setAge(event.target.value);
    };

    React.useEffect(() => {
        setAge(editor?.getAttributes("textStyle")?.fontFamily || "");
    }, [editor?.getAttributes("textStyle")?.fontFamily]);

    return (
        <Box display={"inline-block"} sx={{ minWidth: 75 }}>
            <FormControl
                size="small"
                sx={{ display: "inline-block", minWidth: 75 }}
                fullWidth
            >
                <InputLabel id="demo-simple-select-label">Font</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={age}
                    sx={{ width: "100%" }}
                    label="Font"
                    // displayEmpty
                    onChange={handleChange}
                >
                    <MenuItem sx={{ fontFamily: "Inter" }} value={"Inter"}>
                        Inter
                    </MenuItem>
                    <MenuItem
                        sx={{ fontFamily: "Comic Sans MS, Comic Sans" }}
                        value={"Comic Sans"}
                    >
                        Comic Sans
                    </MenuItem>
                    <MenuItem
                        sx={{ fontFamily: "Monospace" }}
                        value={"Monospace"}
                    >
                        Monospace
                    </MenuItem>
                    <MenuItem value={"Cursive"} sx={{ fontFamily: "cursive" }}>
                        Cursive
                    </MenuItem>
                    <MenuItem value={"Default"}>Default</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
