import { type Task, type TaskState } from "../types.ts";
import * as React from "react";
import { useEffect, useReducer } from "react";
import { type TaskActions, TaskContext } from "../context/TaskContext.ts";

const initialState: TaskState = {
    pending: [],
    "in-progress": [],
    completed: [],
};

function taskReducer(state: TaskState, action: TaskActions): TaskState {
    switch (action.type) {
        case "ADD_TASK": {
            const status = action.task.status;
            return {
                ...state,
                [status]: [...state[status], action.task],
            };
        }

        case "UPDATE_TASK": {
            let updatedTask: Task | null = null;
            let oldStatus: keyof TaskState | null = null;

            for (const status in state) {
                const task = state[status as keyof TaskState].find((t) => t.id === action.id);
                if (task) {
                    updatedTask = { ...task, ...action.task };
                    oldStatus = status as keyof TaskState;
                    break;
                }
            }

            if (!updatedTask || !oldStatus) return state;

            const newStatus = updatedTask.status;

            const newState = {
                ...state,
                [oldStatus]: state[oldStatus].filter((t) => t.id !== action.id),
            };

            return {
                ...newState,
                [newStatus]: [...newState[newStatus], updatedTask],
            };
        }

        case "DELETE_TASK": {
            const newState: TaskState = {
                pending: [],
                "in-progress": [],
                completed: [],
            };

            for (const status of Object.keys(state) as (keyof TaskState)[]) {
                newState[status] = state[status].filter((task) => task.id !== action.id);
            }

            return newState;
        }

        default:
            return state;
    }
}

const localStorageKey = "tasks";

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const loadFromLocalStorage = (): TaskState => {
        try {
            const stored = localStorage.getItem(localStorageKey);
            return stored ? JSON.parse(stored) : initialState;
        } catch {
            return initialState;
        }
    };

    const [tasks, dispatch] = useReducer(taskReducer, loadFromLocalStorage());

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(tasks));
    }, [tasks]);

    return <TaskContext.Provider value={{ tasks, dispatch }}>{children}</TaskContext.Provider>;
};
