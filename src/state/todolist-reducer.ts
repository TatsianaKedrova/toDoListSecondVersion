import {todoApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type FilterValuesType = "all" | "active" | "complete";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    todolistStatus: RequestStatusType
}
let initialState: Array<TodolistDomainType> = [];


//redux Toolkit createSlice method
const slice = createSlice({
    initialState,
    name: "todolists",
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{todoListID: string}>) {
            const index = state.findIndex(element=> element.id === action.payload.todoListID);
            if(index > -1) {
                state.splice(index, 1)
            }
            // state.filter(tl => tl.id !== action.payload.todoListID) this variant is also possible
        },
        addTodoListAC(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({...action.payload.todolist, filter: "all", todolistStatus: "idle"})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{titleTL: string, todoListId: string}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todoListId)
            if (index !== -1) state[index].title = action.payload.titleTL
            // state.map(tl => tl.id === action.payload.todoListId ? {...tl, title: action.payload.titleTL} : tl)
        },
        changeTodoListFilterAC(state, action: PayloadAction<{newFilterValue: FilterValuesType, todoListId: string}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todoListId)
            if (index !== -1) state[index].filter = action.payload.newFilterValue

            // state.map(tl => tl.id === action.payload.todoListId ? {...tl, filter: action.payload.newFilterValue} : tl)
        },
        setTodoListsAC(state, action: PayloadAction<{todoLists: Array<TodolistType>}>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: 'all', todolistStatus: "idle"}));
        },
        changeTodolistStatusAC(state, action: PayloadAction<{todoListId: string, status: RequestStatusType}>) {
            const index = state.findIndex(todolist => todolist.id === action.payload.todoListId)
            if (index !== -1) state[index].todolistStatus = action.payload.status;

            // state.map(tl => tl.id === action.payload.todoListId ? {...tl, todolistStatus: action.payload.status} : tl);
        }
    }
})

//todolist reducer
export const todolistReducer = slice.reducer;
/*export const _todolistReducer = (todoLists: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "todolists/REMOVE-TODOLIST":
            let copyState = [...todoLists];
            return copyState.filter(tl => tl.id !== action.todoListID);

        case "todolists/ADD-TODOLIST": {
            let copyState = [...todoLists];
            const newTodoList: TodolistDomainType = {...action.todolist, filter: "all", todolistStatus: "idle"};
            return [newTodoList, ...copyState];
        }*/
        /*case "todolists/CHANGE-TODOLIST-TITLE": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, title: action.titleTL} : tl)
        }*/
        /*case "todolists/CHANGE-TODOLIST-FILTER": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, filter: action.newFilterValue} : tl)
        }
        case "todolists/CHANGE-TODOLIST-STATUS": {
            const copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, todolistStatus: action.status} : tl);
        }
        case "todolists/SET-TODOLISTS": {
            return action.todoLists.map(tl => ({...tl, filter: 'all', todolistStatus: "idle"}));
        }

        default:
            return todoLists;*/


//action creators
export const { removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC, setTodoListsAC, changeTodolistStatusAC } = slice.actions;

//thunk
export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:"loading"}))
        todoApi.fetchTodoLists()
            .then(res => {
                dispatch(setTodoListsAC({todoLists: res.data}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTodolistStatusAC({todoListId: todoListId, status: "loading"}))
        todoApi.removeTodo(todoListId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTodoListAC({todoListID: todoListId}))
                    dispatch(setAppStatusAC({status: "succeeded"}))
                    dispatch(changeTodolistStatusAC({todoListId: todoListId, status: "succeeded"}))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error: res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error: "Some error occurred"}))
                    }
                    dispatch(setAppStatusAC({status: "failed"}))
                }

            })
    }
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:"loading"}))
    todoApi.addTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodoListAC({todolist: res.data.data.item}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC({error: res.data.messages[0]}))
                } else {
                    dispatch(setAppErrorAC({error: "Some error occurred!"}))
                }
                dispatch(setAppStatusAC({status: "failed"}))
            }
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todoApi.changeTodo(todoListId, title)
        .then(() => {
            dispatch(changeTodoListTitleAC({titleTL: title, todoListId: todoListId}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}


/*export type ActionType =
    RemoveTodolistType
    | AddTodoListType
    | ChangeTodoListTitleType
    | ChangeTodoListFilterType
    | SetTodoListsType
    | ChangeTodolistStatusType*/
















