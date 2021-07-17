import {v1} from "uuid";
import {AddTodoListType, RemoveTodoListType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolist-api";

export type TasksStateType = {
    [key: string] : Array<TaskType>
}

type RemoveTaskType = {
    type: "REMOVE-TASK"
    taskID: string
    todoListId: string
}

type AddTaskType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todoListId: string
}

type ChangeTaskStatus = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    newStatus: TaskStatuses
    todoListId: string
}

type ActionType =
      AddTaskType
    | RemoveTaskType
    | ChangeTaskStatus
    | ChangeTaskTitleType
    | AddTodoListType
    | RemoveTodoListType;

const initState: TasksStateType = {};

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
        default:
            return state;
    }
}

export const AddTaskAC = (title: string, todoListId: string): AddTaskType => {
    return {type: "ADD-TASK", title, todoListId}
}

export const RemoveTaskAC = (taskID: string, todoListId: string): RemoveTaskType => {
    return {
        type: "REMOVE-TASK",
        taskID,
        todoListId
    }
}

export const ChangeTaskStatusAC = (taskID: string, newStatus: TaskStatuses, todoListId: string): ChangeTaskStatus => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        newStatus,
        todoListId
    }
}

export const ChangeTaskTitleAC = (taskID: string, title: string, todoListId: string): ChangeTaskTitleType => {
    return {
        type: "CHANGE-TASK-TITLE",
        taskID,
        title,
        todoListId
    }
}












