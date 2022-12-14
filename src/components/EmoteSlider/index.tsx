import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const marks = [
    {
        value: 0,
        label: "😡",
    },
    {
        value: 25,
        label: "😐",
    },
    {
        value: 50,
        label: "😊",
    },
    {
        value: 75,
        label: "😄",
    },
    {
        value: 100,
        label: "🤩",
    },
];

const valueLabelFormat = (value: number) =>
    marks.findIndex((mark) => mark.value === value);

export default ({ set }: any) => {
    return (
        <Box sx={{ width: 300 }}>
            <Slider
                aria-label="Restricted values"
                defaultValue={0}
                valueLabelFormat={valueLabelFormat}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
                onChange={(e, value) => set(Number(value) / 25)}
            />
        </Box>
    );
};
