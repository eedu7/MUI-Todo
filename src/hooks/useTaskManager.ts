import { useContext } from "react";
import { TaskContext } from "../states/TaskContext.ts";

export const useTaskManager = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskManager must be used within a TaskProvider");
    }
    return context;
};
