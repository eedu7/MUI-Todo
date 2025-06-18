import { Box, Typography } from "@mui/material";

export const NoTaskFound = () => {
    return (
        <Box
            sx={{ width: "100%", height: 96, border: "1px dashed grey" }}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Typography color="grey">No tasks found.</Typography>
        </Box>
    );
};
