import { type Task } from "../types.ts";
import { useEffect, useReducer } from "react";

type TaskActions =
    | {
          type: "ADD_TASK";
          task: Task;
      }
    | {
          type: "UPDATE_TASK";
          id: string;
          task: Partial<Task>;
      }
    | {
          type: "DELETE_TASK";
          id: string;
      }
    | {
          type: "SET_TASKS";
          tasks: Task[];
      };

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

export const useTaskManager = () => {
    const localStorageKey = "tasks";

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

    return { tasks, dispatch };
};
