import { type Task } from "../types.ts";
import * as React from "react";
import { useEffect, useReducer } from "react";
import { type TaskActions, TaskContext } from "../context/TaskContext.ts";

function taskReducer(state: Task[], action: TaskActions): Task[] {
    switch (action.type) {
        case "ADD_TASK":
            return [...state, action.task];
        case "UPDATE_TASK":
            return state.map((task) => (task.id === action.id ? { ...task, ...action.task } : task));
        case "DELETE_TASK":
            return state.filter((task) => task.id !== action.id);
        default:
            return state;
    }
}

const localStorageKey = "tasks";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const loadFromLocalStorage = (): Task[] => {
        try {
            const stored = localStorage.getItem(localStorageKey);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    };

    const [tasks, dispatch] = useReducer(taskReducer, loadFromLocalStorage());

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }, [tasks]);

    return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};
