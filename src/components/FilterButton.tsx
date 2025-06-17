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
            <FilterToggleButton value="all" title="All" />
            <FilterToggleButton value="pending" title="Pending" />
            <FilterToggleButton value="in-progress" title="In-Progress" />
            <FilterToggleButton value="completed" title="Completed" />
        </ToggleButtonGroup>
    );
};

interface FilterToggleButtonProps {
    value: string;
    title: string;
}

const FilterToggleButton = ({ value, title }: FilterToggleButtonProps) => {
    return (
        <ToggleButton value={value}>
            <Typography variant="h6" sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem" }, px: { xs: 0, sm: 1 } }}>
                {title}
            </Typography>
        </ToggleButton>
    );
};
