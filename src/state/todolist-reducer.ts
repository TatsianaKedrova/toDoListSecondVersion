import {todoApi, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "complete";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

let initialState: Array<TodolistDomainType> = [];

//todolist reducer
export const todolistReducer = (todoLists: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            let copyState = [...todoLists];
            return copyState.filter(tl => tl.id !== action.todoListID);

        case "ADD-TODOLIST": {
            let copyState = [...todoLists];
            const newTodoList: TodolistDomainType = {...action.todolist, filter: "all"};
            /*{
                id: action.todoListId,
                addedDate: new Date().getDate(),
                order: Number(new Date()),
                title: action.titleTL,
                filter: "all"
            }*/
            return [newTodoList, ...copyState];
        }
        case "CHANGE-TODOLIST-TITLE": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, title: action.titleTL} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, filter: action.newFilterValue} : tl)
        }
        case "SET_TODOLISTS": {
            return action.todoLists.map(tl => ({...tl, filter: 'all'}));
        }
        default:
            return todoLists;
    }
}

//action creators
export const RemoveTodoListAC = (todoListID: string) => ({type: "REMOVE-TODOLIST", todoListID} as const);
export const AddTodoListAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const);
export const ChangeTodoListTitleAC = (titleTL: string, todoListId: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    titleTL,
    todoListId
} as const);
export const ChangeTodoListFilterAC = (newFilterValue: FilterValuesType, todoListId: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilterValue,
    todoListId
} as const);
export const SetTodoListsAC = (todoLists: Array<TodolistType>) => ({type: "SET_TODOLISTS", todoLists} as const);

//thunk
export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch<ActionType>) => {
        todoApi.fetchTodoLists()
            .then(res => {
                dispatch(SetTodoListsAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoApi.removeTodo(todoListId)
            .then( () => {
                dispatch(RemoveTodoListAC(todoListId))
            })
    }
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todoApi.addTodo(title)
        .then( res => {
            dispatch(AddTodoListAC(res.data.data.item))
        })
}

export const changeTodolistTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todoApi.changeTodoTitle(todoListId, title)
        .then( () => {
            dispatch(ChangeTodoListTitleAC(title, todoListId))
        })
}

//action types
export type RemoveTodolistType = ReturnType<typeof RemoveTodoListAC>;
export type AddTodoListType = ReturnType<typeof AddTodoListAC>;
export type ChangeTodoListTitleType = ReturnType<typeof ChangeTodoListTitleAC>;
export type ChangeTodoListFilterType = ReturnType<typeof ChangeTodoListFilterAC>;
export type SetTodoListsType = ReturnType<typeof SetTodoListsAC>;

export type ActionType =
    RemoveTodolistType
    | AddTodoListType
    | ChangeTodoListTitleType
    | ChangeTodoListFilterType
    | SetTodoListsType;













