import type { TaskState } from "../types.ts";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { TodoCard } from "./TodoCard.tsx";
import { NoTaskFound } from "./NoTaskFound.tsx";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useTaskManager } from "../hooks/useTaskManager.ts";

interface AllTodosBoardProps {
    tasks: TaskState;
}

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id,
        transition: {
            duration: 150,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} {...attributes} style={style} {...listeners}>
            {children}
        </div>
    );
};

export const AllTodosBoard = ({ tasks }: AllTodosBoardProps) => {
    const pendingTasks = tasks.pending;
    const completedTasks = tasks.completed;
    const inProgressTasks = tasks["in-progress"];

    const { dispatch } = useTaskManager();

    const handleSortableDragEnd = (event: DragEndEvent, arrType: "pending" | "in-progress" | "completed") => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        if (arrType === "pending") {
            const oldIndex = pendingTasks.findIndex((task) => task.id === active.id);
            const newIndex = pendingTasks.findIndex((task) => task.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const updated = arrayMove(pendingTasks, oldIndex, newIndex);
                dispatch({
                    type: "SET_TASKS",
                    tasks: {
                        pending: updated,
                        completed: completedTasks,
                        "in-progress": inProgressTasks,
                    },
                });
            }
        } else if (arrType === "in-progress") {
            const oldIndex = inProgressTasks.findIndex((task) => task.id === active.id);
            const newIndex = inProgressTasks.findIndex((task) => task.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const updated = arrayMove(inProgressTasks, oldIndex, newIndex);
                dispatch({
                    type: "SET_TASKS",
                    tasks: {
                        pending: pendingTasks,
                        completed: completedTasks,
                        "in-progress": updated,
                    },
                });
            }
        } else if (arrType === "completed") {
            const oldIndex = completedTasks.findIndex((task) => task.id === active.id);
            const newIndex = completedTasks.findIndex((task) => task.id === over.id);

            if (oldIndex !== -1 && newIndex !== -1) {
                const updated = arrayMove(completedTasks, oldIndex, newIndex);
                dispatch({
                    type: "SET_TASKS",
                    tasks: {
                        pending: pendingTasks,
                        completed: updated,
                        "in-progress": inProgressTasks,
                    },
                });
            }
        }
    };

    return (
        <DndContext>
            <Grid container spacing={2}>
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 4, minHeight: 200 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" component="h2" fontWeight="bold" color="warning">
                                Pending Task
                            </Typography>
                            <DndContext onDragEnd={(e: DragEndEvent) => handleSortableDragEnd(e, "pending")}>
                                <SortableContext items={pendingTasks} strategy={verticalListSortingStrategy}>
                                    {pendingTasks.length == 0 ? (
                                        <NoTaskFound />
                                    ) : (
                                        pendingTasks.map((task) => (
                                            <SortableItem id={task.id} key={task.id}>
                                                <TodoCard {...task} />
                                            </SortableItem>
                                        ))
                                    )}
                                </SortableContext>
                            </DndContext>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 4, minHeight: 200 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" component="h2" fontWeight="bold" color="info">
                                In-Progress
                            </Typography>
                            <DndContext onDragEnd={(e: DragEndEvent) => handleSortableDragEnd(e, "in-progress")}>
                                <SortableContext items={inProgressTasks}>
                                    {inProgressTasks.length == 0 ? (
                                        <NoTaskFound />
                                    ) : (
                                        inProgressTasks.map((task) => (
                                            <SortableItem id={task.id} key={task.id}>
                                                <TodoCard {...task} />
                                            </SortableItem>
                                        ))
                                    )}
                                </SortableContext>
                            </DndContext>
                        </Stack>
                    </Paper>
                </Grid>
                <Grid
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >
                    <Paper elevation={2} sx={{ p: 2, borderRadius: 4, minHeight: 200 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" component="h2" fontWeight="bold" color="success">
                                In-Progress
                            </Typography>
                            <DndContext onDragEnd={(e: DragEndEvent) => handleSortableDragEnd(e, "completed")}>
                                <SortableContext items={completedTasks}>
                                    {completedTasks.length == 0 ? (
                                        <NoTaskFound />
                                    ) : (
                                        completedTasks.map((task) => (
                                            <SortableItem id={task.id} key={task.id}>
                                                <TodoCard {...task} />
                                            </SortableItem>
                                        ))
                                    )}
                                </SortableContext>
                            </DndContext>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </DndContext>
    );
};
