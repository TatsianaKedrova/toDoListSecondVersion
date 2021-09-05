import {TaskPriorities, TaskStatuses, TaskType, todoApi, TodolistType, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initState: TasksStateType = {};

//create async thunk
export const fetchTasksTC = createAsyncThunk(
    'tasks/fetchTasks',
    (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: "loading"}))
        todoApi.fetchTasks(todoListId)
            .then(res => {
                thunkAPI.dispatch(setTaskAC({tasks: res.data.items, todoListId: todoListId}))
                thunkAPI.dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch((error) => {
                handleServerNetworkError(error, thunkAPI.dispatch)
            })
    }

)


//redux Toolkit createSlice method
const slice = createSlice({
    initialState: initState,
    name: "tasks",
    reducers: {
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload)
        },
        removeTaskAC(state, action: PayloadAction<{ taskID: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskID);
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        updateTaskAC(state, action: PayloadAction<{ taskID: string, model: UpdateDomainTaskModelType, todoListId: string }>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskID);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTaskAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.tasks;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTodoListAC, (state, action: PayloadAction<{ todolist: TodolistType }>) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(removeTodoListAC, (state, action: PayloadAction<{ todoListID: string }>) => {
                delete state[action.payload.todoListID]
            })
            .addCase(setTodoListsAC, (state, action: PayloadAction<{ todoLists: Array<TodolistType> }>) => {
                action.payload.todoLists.forEach(tl => {
                    state[tl.id] = []
                })
            })
    }
});

//action creators
export const {addTaskAC, removeTaskAC, updateTaskAC, setTaskAC} = slice.actions; //action creators

// tasks reducer
export const tasksReducer = slice.reducer;

//thunks
export const fetchTasksTC_ = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoApi.fetchTasks(todoListId)
            .then(res => {
                dispatch(setTaskAC({tasks: res.data.items, todoListId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTaskTC = (todoListId: string, taskTitle: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoApi.addTask(todoListId, taskTitle)
            .then(res => {

                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoApi.removeTask(todoListId, taskId)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskID: taskId, todoListId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskID: string, model: UpdateDomainTaskModelType, todoListId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todoListId].find(task => task.id === taskID)

    if (!task) {
        console.warn("Task not found");
        return;
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        completed: task.completed,
        startDate: task.startDate,
        ...model
    }
    dispatch(setAppStatusAC({status: "loading"}))
    todoApi.changeTask(todoListId, taskID, apiModel)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC({taskID, model, todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}


export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string

}













