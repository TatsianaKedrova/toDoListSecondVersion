import {TaskPriorities, TaskStatuses, TaskType, todoApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

//types
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

const initState: TasksStateType = {};

//redux Toolkit createSlice method
const slice = createSlice({
    initialState: initState,
    name: "tasks",
    reducers: {
        addTaskAC(state, action: PayloadAction<{task: TaskType}>) {

        },
        removeTaskAC(state, action: PayloadAction<{taskID: string, todoListId: string}>) {

        },
        updateTaskAC(state, action: PayloadAction<{taskID: string, model: UpdateDomainTaskModelType, todoListId: string}>) {

        },
        setTaskAC(state, action: PayloadAction<{tasks: Array<TaskType>, todoListId: string}>) {

        }
    },
    extraReducers: {

    }
});

//action creators
export const { addTaskAC, removeTaskAC, updateTaskAC, setTaskAC } = slice.actions;

// tasks reducer
export const tasksReducer = slice.reducer;
// export const _tasksReducer = (state: TasksStateType = initState, action:any): TasksStateType => {
//
//     switch (action.type) {
//         case "tasks/ADD-TASK":
//             console.log(action)
//             let newTask = action.task;
//             const copyState = {...state};
//             const updatedTasks = [newTask, ...copyState[newTask.todoListId]];
//             return {
//                 ...copyState,
//                 [newTask.todoListId]: updatedTasks
//             }
//         case "tasks/REMOVE-TASK": {
//             let copyState = {...state};
//             copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskID)
//             return copyState;
//         }
//         case "tasks/UPDATE-TASK": {
//             let copyState = {...state};
//             copyState[action.todoListId] = copyState[action.todoListId].map(task => task.id === action.taskID ? {
//                 ...task,
//                 ...action.model
//             } : task);
//             return copyState;
//         }
//         case removeTodoListAC.type:
//             return {...state, [action.payload.todolist.id]: []}
//         case addTodoListAC.type: {
//             let copyState = {...state};
//             delete copyState[action.payload.todoListID]
//             return copyState;
//         }
//         case setTodoListsAC.type: {
//             const copyState = {...state};
//             action.payload.todoLists.forEach((tl : any) => {
//                 copyState[tl.id] = []
//             })
//             return copyState;
//         }
//         case "tasks/SET-TASK": {
//             return {...state, [action.todoListId]: action.tasks}
//         }
//         default:
//             return state;
//     }
// }

//action creators
// export const addTaskAC = (task: TaskType) => ({type: "tasks/ADD-TASK", task} as const);
// export const removeTaskAC = (taskID: string, todoListId: string) => ({
//     type: "tasks/REMOVE-TASK",
//     taskID,
//     todoListId
// } as const);
// export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListId: string) => ({
//     type: "tasks/UPDATE-TASK",
//     taskID,
//     model,
//     todoListId
// } as const);
//
// export const setTaskAC = (tasks: Array<TaskType>, todoListId: string) => ({
//     type: "tasks/SET-TASK",
//     tasks,
//     todoListId
// } as const);

//action types
// export type AddTaskType = ReturnType<typeof addTaskAC>;
// export type RemoveTaskType = ReturnType<typeof removeTaskAC>;
// export type ChangeTaskStatusType = ReturnType<typeof updateTaskAC>;
// export type SetTaskType = ReturnType<typeof setTaskAC>;


//thunks
export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        todoApi.fetchTasks(todoListId)
            .then(res => {
                dispatch(setTaskAC({tasks: res.data.items, todoListId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch( (error) => {
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
                    dispatch(addTaskAC({task: res.data.data.item}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch( (error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoApi.removeTask(todoListId, taskId)
        .then((res) => {
            if(res.data.resultCode === 0) {
                dispatch(removeTaskAC({taskID: taskId, todoListId: todoListId}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch( (error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todoListId].find(task => task.id === taskId)

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
        ...domainModel
    }
    dispatch(setAppStatusAC({status: "loading"}))
    todoApi.changeTask(todoListId, taskId, apiModel)
        .then(res => {
            if(res.data.resultCode === 0) {
                alert("Taniusha is genius!")
                // dispatch(UpdateTaskAC(taskId, domainModel, todoListId))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch( (error) => {
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













