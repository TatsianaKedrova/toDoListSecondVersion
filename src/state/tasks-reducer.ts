import {v1} from "uuid";
import {AddTodoListType, RemoveTodolistType, SetTodoListsType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

//types
export type TasksStateType = {
    [key: string] : Array<TaskType>
}

const initState: TasksStateType = {};

// tasks reducer
export const tasksReducer = (state: TasksStateType = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":

            let newTask: TaskType = {description: `newTask number ${action.todoListId}`, title: action.title, completed: false, status:TaskStatuses.New, priority: TaskPriorities.Middle, startDate: `${new Date()}`, deadline:`${new Date().getDate() + 10}`, id: v1(), todoListId: action.todoListId, order: 1, addedDate: `${new Date()}`};
            const copyState = {...state};
            const updatedTasks = [newTask, ...copyState[action.todoListId]];
            return {
                ...copyState,
                [action.todoListId]: updatedTasks
            }
        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskID)
            return copyState;
        }
        case "CHANGE-TASK-STATUS": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].map(task => task.id === action.taskID ? {
                ...task,
                status: action.newStatus
            } : task);
            return copyState;
        }
        case "CHANGE-TASK-TITLE": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].map(task => task.id === action.taskID ? {
                ...task,
                title: action.title
            } : task);
            return copyState;
        }

        case 'ADD-TODOLIST':
            return {...state, [action.todoListId]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.todoListID]
            return copyState;
        }
        case "SET_TODOLISTS": {
            const copyState = {...state};
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        default:
            return state;
    }
}

//action creators
export const AddTaskAC = (title: string, todoListId: string) => ({type: "ADD-TASK", title, todoListId} as const);
export const RemoveTaskAC = (taskID: string, todoListId: string) => ({type: "REMOVE-TASK", taskID, todoListId} as const);
export const ChangeTaskStatusAC = (taskID: string, newStatus: TaskStatuses, todoListId: string) => ({type: "CHANGE-TASK-STATUS", taskID, newStatus, todoListId} as const);
export const ChangeTaskTitleAC = (taskID: string, title: string, todoListId: string) => ({type: "CHANGE-TASK-TITLE", taskID, title, todoListId} as const);

//action types
export type AddTaskType = ReturnType<typeof AddTaskAC>;
export type RemoveTaskType = ReturnType<typeof RemoveTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof ChangeTaskStatusAC>;
export type ChangeTaskTitleType = ReturnType<typeof ChangeTaskTitleAC>;

type ActionType =
      AddTaskType
    | RemoveTaskType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodoListType
    | RemoveTodolistType
    | SetTodoListsType










