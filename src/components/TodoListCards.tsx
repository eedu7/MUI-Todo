import { Grid } from "@mui/material";
import { FilterContext } from "../context/FilterContext.ts";
import { useContext } from "react";
import { useTaskManager } from "../hooks/useTaskManager.ts";
import { AllTodosBoard } from "./AllTodosBoard.tsx";
import { TodoCard } from "./TodoCard.tsx";
import { NoTaskFound } from "./NoTaskFound.tsx";

export const TodoListCards = () => {
    const { filter } = useContext(FilterContext);

    const { tasks } = useTaskManager();

    if (filter === "all") {
        return <AllTodosBoard tasks={tasks} />;
    }

    const filteredTasks = tasks[filter as keyof typeof tasks] ?? [];

    if (filteredTasks.length === 0) {
        return <NoTaskFound />;
    }

    return (
        <Grid container spacing={2}>
            {filteredTasks.map((task) => (
                <Grid
                    key={task.id}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                    }}
                >
                    <TodoCard {...task} />
                </Grid>
            ))}
        </Grid>
    );
};
