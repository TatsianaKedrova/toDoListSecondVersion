import {FilterValuesType, TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAC, AddTodoListType, RemoveTodoListType} from "./todolist-reducer";

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
    newIsDone: boolean
    todoListId: string
}

type ActionType =
      AddTaskType
    | RemoveTaskType
    | ChangeTaskStatus
    | ChangeTaskTitleType
    | AddTodoListType
    | RemoveTodoListType;

const todoList_1 = v1();
const todoList_2 = v1();

const initState: TasksStateType = {};
/*{
    [todoList_1]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JAVASCRIPT", isDone: false},

    ],
    [todoList_2]: [
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JAVASCRIPT", isDone: false},
    ],

}*/
export const tasksReducer = (state: TasksStateType = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":

            let newTask: TaskType = {id: v1(), title: action.title, isDone: false};
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
                isDone: action.newIsDone
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

export const ChangeTaskStatusAC = (taskID: string, newIsDone: boolean, todoListId: string): ChangeTaskStatus => {
    return {
        type: "CHANGE-TASK-STATUS",
        taskID,
        newIsDone,
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












