import {todoApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppSetStatusType, RequestStatusType, setAppErrorAC, SetAppErrorType, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

export type FilterValuesType = "all" | "active" | "complete";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    todolistStatus: RequestStatusType
}

let initialState: Array<TodolistDomainType> = [];

//todolist reducer
export const todolistReducer = (todoLists: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "todolists/REMOVE-TODOLIST":
            let copyState = [...todoLists];
            return copyState.filter(tl => tl.id !== action.todoListID);

        case "todolists/ADD-TODOLIST": {
            let copyState = [...todoLists];
            const newTodoList: TodolistDomainType = {...action.todolist, filter: "all", todolistStatus: "idle"};
            return [newTodoList, ...copyState];
        }
        case "todolists/CHANGE-TODOLIST-TITLE": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, title: action.titleTL} : tl)
        }
        case "todolists/CHANGE-TODOLIST-FILTER": {
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
            return todoLists;
    }
}

//action creators
export const RemoveTodoListAC = (todoListID: string) => ({type: "todolists/REMOVE-TODOLIST", todoListID} as const);
export const AddTodoListAC = (todolist: TodolistType) => ({type: "todolists/ADD-TODOLIST", todolist} as const);
export const ChangeTodoListTitleAC = (titleTL: string, todoListId: string) => ({
    type: "todolists/CHANGE-TODOLIST-TITLE",
    titleTL,
    todoListId
} as const);
export const ChangeTodoListFilterAC = (newFilterValue: FilterValuesType, todoListId: string) => ({
    type: "todolists/CHANGE-TODOLIST-FILTER",
    newFilterValue,
    todoListId
} as const);
export const SetTodoListsAC = (todoLists: Array<TodolistType>) => ({type: "todolists/SET-TODOLISTS", todoLists} as const);
export const ChangeTodolistStatusAC = (todoListId: string, status: RequestStatusType) => ({
    type: "todolists/CHANGE-TODOLIST-STATUS",
    todoListId,
    status
} as const);

//thunk
export const fetchTodoListsTC = () => {
    return (dispatch: DispatchTodoThunkType) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.fetchTodoLists()
            .then(res => {
                dispatch(SetTodoListsAC(res.data))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch);
            })
    }
}
export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: DispatchTodoThunkType) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(ChangeTodolistStatusAC(todoListId, "loading"))
        todoApi.removeTodo(todoListId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(RemoveTodoListAC(todoListId))
                    dispatch(setAppStatusAC("succeeded"))
                    dispatch(ChangeTodolistStatusAC(todoListId, "succeeded"))
                } else {
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC("Some error occurred"))
                    }
                    dispatch(setAppStatusAC("failed"))
                }

            })
    }
}
export const addTodoListTC = (title: string) => (dispatch: DispatchTodoThunkType) => {
    dispatch(setAppStatusAC("loading"))
    todoApi.addTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(AddTodoListAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                if (res.data.messages.length) {
                    dispatch(setAppErrorAC(res.data.messages[0]))
                } else {
                    dispatch(setAppErrorAC("Some error occurred!"))
                }
                dispatch(setAppStatusAC("failed"))
            }
        })
}
export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: DispatchTodoThunkType) => {
    dispatch(setAppStatusAC("loading"))
    todoApi.changeTodo(todoListId, title)
        .then(() => {
            dispatch(ChangeTodoListTitleAC(title, todoListId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

//action types
export type RemoveTodolistType = ReturnType<typeof RemoveTodoListAC>;
export type AddTodoListType = ReturnType<typeof AddTodoListAC>;
export type ChangeTodoListTitleType = ReturnType<typeof ChangeTodoListTitleAC>;
export type ChangeTodoListFilterType = ReturnType<typeof ChangeTodoListFilterAC>;
export type SetTodoListsType = ReturnType<typeof SetTodoListsAC>;
export type ChangeTodolistStatusType = ReturnType<typeof ChangeTodolistStatusAC>;

export type ActionType =
    RemoveTodolistType
    | AddTodoListType
    | ChangeTodoListTitleType
    | ChangeTodoListFilterType
    | SetTodoListsType
    | ChangeTodolistStatusType

export type DispatchTodoThunkType = Dispatch<ActionType | AppSetStatusType | SetAppErrorType>;















