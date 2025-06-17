import {
    Box,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    type SelectChangeEvent,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { TodoCard } from "./components/TodoCard.tsx";
import { completedTasks, inProgressTasks, pendingTasks } from "./data.ts";
import { amber, blue } from "@mui/material/colors";

type TodoStatus = "all" | "in-progress" | "pending" | "completed";

function App() {
    const [selectedFilter, setSelectedFilter] = useState<TodoStatus>("all");
    const handleFilterChange = (_: React.MouseEvent<HTMLElement>, newFilter: string | null) => {
        if (newFilter === null) {
            setSelectedFilter("all");
        } else {
            setSelectedFilter(newFilter as TodoStatus);
        }
    };
    return (
        <Container
            sx={{ height: "100%" }}
            maxWidth="xl"
        >
            <Stack spacing={4}>
                <Box>
                    <Typography
                        variant="h4"
                        component="h1"
                    >
                        MUI - Todo List
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    justifyContent="end"
                >
                    <TextField
                        label="Search"
                        variant="standard"
                        slotProps={{
                            input: {
                                endAdornment: <SearchIcon />,
                            },
                        }}
                        disabled
                    />
                </Box>
                <Box>
                    <FormControl
                        fullWidth
                        sx={{
                            display: {
                                xs: "flex",
                                sm: "none",
                            },
                        }}
                    >
                        <InputLabel id="todo-filters">Filters</InputLabel>
                        <Select
                            labelId="todo-filters"
                            id="todo-filter-selection"
                            value={selectedFilter}
                            onChange={(event: SelectChangeEvent) => setSelectedFilter(event.target.value as TodoStatus)}
                            label="Filters"
                            size="small"
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="in-progress">In-Progress</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <ToggleButtonGroup
                        color="primary"
                        aria-label="Filters"
                        value={selectedFilter}
                        onChange={handleFilterChange}
                        exclusive
                        size={"small"}
                        sx={{
                            display: {
                                xs: "none",
                                sm: "flex",
                            },
                        }}
                    >
                        <ToggleButton value={"all"}>All</ToggleButton>
                        <ToggleButton value="in-progress">In-Progress</ToggleButton>
                        <ToggleButton value="pending">Pending</ToggleButton>
                        <ToggleButton value="completed">Completed</ToggleButton>
                    </ToggleButtonGroup>
                </Box>
                <Divider />
                <Grid
                    container
                    gap={2}
                >
                    <Grid size="grow">
                        <Paper
                            elevation={8}
                            sx={{ display: "flex", gap: 2, flexDirection: "column", p: 2, borderRadius: 4 }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <AutorenewIcon
                                        sx={{
                                            color: blue[300],
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: blue[300],
                                        }}
                                        fontWeight={700}
                                    >
                                        In-Progress
                                    </Typography>
                                </Box>
                                <Box>
                                    <IconButton
                                        aria-label="add"
                                        size="small"
                                    >
                                        <AddCircleIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            {inProgressTasks.map((task) => (
                                <TodoCard
                                    key={task.id}
                                    {...task}
                                />
                            ))}
                        </Paper>
                    </Grid>
                    <Grid size="grow">
                        <Paper
                            elevation={8}
                            sx={{ display: "flex", gap: 2, flexDirection: "column", p: 2, borderRadius: 4 }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <HourglassEmptyIcon
                                        sx={{
                                            color: amber[300],
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        color={amber[300]}
                                    >
                                        Pending
                                    </Typography>
                                </Box>
                            </Box>
                            {pendingTasks.map((task) => (
                                <TodoCard
                                    key={task.id}
                                    {...task}
                                />
                            ))}
                        </Paper>
                    </Grid>
                    <Grid size="grow">
                        <Paper
                            elevation={8}
                            sx={{ display: "flex", gap: 2, flexDirection: "column", p: 2, borderRadius: 4 }}
                        >
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                >
                                    <CheckCircleIcon color={"success"} />
                                    <Typography
                                        variant="h6"
                                        color="success"
                                        fontWeight={700}
                                    >
                                        Completed
                                    </Typography>
                                </Box>
                            </Box>
                            {completedTasks.map((task) => (
                                <TodoCard
                                    key={task.id}
                                    {...task}
                                />
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
}

export default App;
