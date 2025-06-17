import { Box, ButtonGroup, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";

export const TodoListToolbar = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" component="h1" fontWeight="bold">
                    Todo List
                </Typography>
                <ButtonGroup>
                    <Tooltip title="Notifications">
                        <IconButton aria-label="notifications">
                            <NotificationsNoneIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Settings">
                        <IconButton aria-label="settings">
                            <SettingsIcon />
                        </IconButton>
                    </Tooltip>
                </ButtonGroup>
            </Stack>
        </Box>
    );
};
