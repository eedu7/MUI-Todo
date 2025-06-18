import { Box, ButtonGroup, IconButton, Stack, Tooltip, Typography } from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";

// import Logo from "/public/logo.svg";

export const TodoListToolbar = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    {/*<img src={Logo} alt="Logo" aria-label="logo" height={24} width={24} />*/}
                    <Typography variant="h5" component="h1" fontWeight="bold">
                        Todo List
                    </Typography>
                </Stack>
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
