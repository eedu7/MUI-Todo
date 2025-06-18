import { useContext } from "react";
import { ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";

import { FilterContext } from "../states/FilterContext.ts";

export const FilterButton = () => {
    const { filter, handleFilterChange } = useContext(FilterContext);

    return (
        <ToggleButtonGroup size={"small"} value={filter} onChange={handleFilterChange} exclusive color={"primary"}>
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
