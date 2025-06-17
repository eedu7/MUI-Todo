import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

type Filter = "all" | "pending" | "in-progress" | "completed";

export const FilterButton = () => {
    const [selected, setSelected] = useState<Filter>("all");

    const handleChange = (_: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        if (newAlignment) {
            setSelected(newAlignment as Filter);
        } else {
            setSelected("all");
        }
    };

    return (
        <ToggleButtonGroup size={"small"} value={selected} onChange={handleChange} exclusive color={"primary"}>
            <ToggleButton value="all">
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    All
                </Typography>
            </ToggleButton>
            <ToggleButton value="pending">
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    Pending
                </Typography>
            </ToggleButton>
            <ToggleButton value="in-progress">
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    In-Progress
                </Typography>
            </ToggleButton>
            <ToggleButton value="completed">
                <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1rem" } }}>
                    Completed
                </Typography>
            </ToggleButton>
        </ToggleButtonGroup>
    );
};
