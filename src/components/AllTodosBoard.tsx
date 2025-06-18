import type { Task, TaskState } from "../types.ts"; // Assuming you have a Task type
import { Grid, Paper, Stack, Typography } from "@mui/material";
import { TodoCard } from "./TodoCard.tsx";
import { NoTaskFound } from "./NoTaskFound.tsx";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
    closestCorners,
    DndContext,
    type DragEndEvent,
    DragOverlay,
    type DragStartEvent,
    useDroppable,
} from "@dnd-kit/core";
import { useTaskManager } from "../hooks/useTaskManager.ts";
import { useState } from "react";

interface AllTodosBoardProps {
    tasks: TaskState;
}

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id,
        transition: {
            duration: 150,
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div ref={setNodeRef} {...attributes} style={style} {...listeners}>
            {children}
        </div>
    );
};

// Droppable zone component for each column
const DroppableColumn = ({
    id,
    children,
    title,
    color,
}: {
    id: string;
    children: React.ReactNode;
    title: string;
    color: "warning" | "info" | "success";
}) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <Paper
            ref={setNodeRef}
            elevation={2}
            sx={{
                p: 2,
                borderRadius: 4,
                minHeight: 200,
                backgroundColor: isOver ? "action.hover" : "background.paper",
                transition: "background-color 0.2s ease",
                border: isOver ? "2px dashed" : "2px solid transparent",
                borderColor: isOver ? "primary.main" : "transparent",
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6" component="h2" fontWeight="bold" color={color}>
                    {title}
                </Typography>
                <div style={{ minHeight: "150px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {children}
                </div>
            </Stack>
        </Paper>
    );
};

export const AllTodosBoard = ({ tasks }: AllTodosBoardProps) => {
    const pendingTasks = tasks.pending;
    const completedTasks = tasks.completed;
    const inProgressTasks = tasks["in-progress"];
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const { dispatch } = useTaskManager();

    // Helper function to find which column a task belongs to
    const findTaskColumn = (taskId: string): "pending" | "in-progress" | "completed" | null => {
        if (pendingTasks.find((task) => task.id === taskId)) return "pending";
        if (inProgressTasks.find((task) => task.id === taskId)) return "in-progress";
        if (completedTasks.find((task) => task.id === taskId)) return "completed";
        return null;
    };

    // Helper function to find a task by ID
    const findTask = (taskId: string): Task | null => {
        return [...pendingTasks, ...inProgressTasks, ...completedTasks].find((task) => task.id === taskId) || null;
    };

    // Helper function to remove task from its current column
    const removeTaskFromColumn = (taskId: string, column: "pending" | "in-progress" | "completed") => {
        switch (column) {
            case "pending":
                return pendingTasks.filter((task) => task.id !== taskId);
            case "in-progress":
                return inProgressTasks.filter((task) => task.id !== taskId);
            case "completed":
                return completedTasks.filter((task) => task.id !== taskId);
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        const task = findTask(event.active.id as string);
        setActiveTask(task);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveTask(null);

        if (!over) return;

        const activeTaskId = active.id as string;
        const activeTask = findTask(activeTaskId);
        const sourceColumn = findTaskColumn(activeTaskId);

        if (!activeTask || !sourceColumn) return;

        let targetColumn: "pending" | "in-progress" | "completed" | null = null;
        let targetIndex: number | undefined = undefined;

        // Check if dropping directly on a column (empty column case)
        if (over.id === "pending" || over.id === "in-progress" || over.id === "completed") {
            targetColumn = over.id as "pending" | "in-progress" | "completed";
            // When dropping on empty column, add to the end
            targetIndex = undefined;
        } else {
            // Dropping on another task (for reordering within column or moving between columns)
            const overTask = findTask(over.id as string);
            if (overTask) {
                targetColumn = findTaskColumn(over.id as string);
                if (targetColumn) {
                    const targetTasks =
                        targetColumn === "pending"
                            ? pendingTasks
                            : targetColumn === "in-progress"
                              ? inProgressTasks
                              : completedTasks;
                    targetIndex = targetTasks.findIndex((task) => task.id === over.id);
                }
            }
        }

        if (!targetColumn) return;

        // Handle the move
        let newPending = [...pendingTasks];
        let newInProgress = [...inProgressTasks];
        let newCompleted = [...completedTasks];

        if (sourceColumn === targetColumn && targetIndex !== undefined) {
            // Reordering within the same column
            const sourceTasks =
                sourceColumn === "pending"
                    ? pendingTasks
                    : sourceColumn === "in-progress"
                      ? inProgressTasks
                      : completedTasks;

            const oldIndex = sourceTasks.findIndex((task) => task.id === activeTaskId);
            const newIndex = targetIndex;

            if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
                const updated = arrayMove(sourceTasks, oldIndex, newIndex);

                if (sourceColumn === "pending") newPending = updated;
                else if (sourceColumn === "in-progress") newInProgress = updated;
                else newCompleted = updated;
            }
        } else if (sourceColumn !== targetColumn) {
            // Moving between columns
            // Remove from source column
            if (sourceColumn === "pending") {
                newPending = removeTaskFromColumn(activeTaskId, sourceColumn);
            } else if (sourceColumn === "in-progress") {
                newInProgress = removeTaskFromColumn(activeTaskId, sourceColumn);
            } else {
                newCompleted = removeTaskFromColumn(activeTaskId, sourceColumn);
            }

            // Add to target column
            const updatedTask = { ...activeTask, status: targetColumn };
            if (targetColumn === "pending") {
                if (targetIndex !== undefined) {
                    newPending.splice(targetIndex, 0, updatedTask);
                } else {
                    newPending.push(updatedTask);
                }
            } else if (targetColumn === "in-progress") {
                if (targetIndex !== undefined) {
                    newInProgress.splice(targetIndex, 0, updatedTask);
                } else {
                    newInProgress.push(updatedTask);
                }
            } else {
                if (targetIndex !== undefined) {
                    newCompleted.splice(targetIndex, 0, updatedTask);
                } else {
                    newCompleted.push(updatedTask);
                }
            }
        }

        // Update the state
        dispatch({
            type: "SET_TASKS",
            tasks: {
                pending: newPending,
                "in-progress": newInProgress,
                completed: newCompleted,
            },
        });
    };

    // Create a combined items array for the sortable context
    const allItems = [
        ...pendingTasks.map((task) => task.id),
        ...inProgressTasks.map((task) => task.id),
        ...completedTasks.map((task) => task.id),
    ];

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <SortableContext items={allItems} strategy={verticalListSortingStrategy}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <DroppableColumn id="pending" title="Pending Tasks" color="warning">
                            {pendingTasks.length === 0 ? (
                                <NoTaskFound />
                            ) : (
                                pendingTasks.map((task) => (
                                    <SortableItem id={task.id} key={task.id}>
                                        <TodoCard {...task} />
                                    </SortableItem>
                                ))
                            )}
                        </DroppableColumn>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DroppableColumn id="in-progress" title="In Progress" color="info">
                            {inProgressTasks.length === 0 ? (
                                <NoTaskFound />
                            ) : (
                                inProgressTasks.map((task) => (
                                    <SortableItem id={task.id} key={task.id}>
                                        <TodoCard {...task} />
                                    </SortableItem>
                                ))
                            )}
                        </DroppableColumn>
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <DroppableColumn id="completed" title="Completed Tasks" color="success">
                            {completedTasks.length === 0 ? (
                                <NoTaskFound />
                            ) : (
                                completedTasks.map((task) => (
                                    <SortableItem id={task.id} key={task.id}>
                                        <TodoCard {...task} />
                                    </SortableItem>
                                ))
                            )}
                        </DroppableColumn>
                    </Grid>
                </Grid>
            </SortableContext>

            <DragOverlay>{activeTask ? <TodoCard {...activeTask} /> : null}</DragOverlay>
        </DndContext>
    );
};
