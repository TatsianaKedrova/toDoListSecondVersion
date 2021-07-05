import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../AppWithRedux";

export type RemoveTodoListType = {
    type: "REMOVE-TODOLIST"
    todoListID: string
}

export type AddTodoListType = {
    type: "ADD-TODOLIST"
    titleTL: string
    todoListId: string
}

type ChangeTodoListTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    titleTL: string
    todoListId: string
}

type ChangeTodoListFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilterValue: FilterValuesType
    todoListId: string
}

type ActionType = RemoveTodoListType | AddTodoListType | ChangeTodoListTitleType | ChangeTodoListFilterType;

let initialState: Array<TodoListType> = [];

export const todolistReducer = (todoLists: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            let copyState = [...todoLists];
            return copyState.filter(tl => tl.id !== action.todoListID);

        case "ADD-TODOLIST": {
            let copyState = [...todoLists];
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.titleTL,
                filter: "all"
            }
            return [...copyState, newTodoList];

        }
        case "CHANGE-TODOLIST-TITLE": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, title: action.titleTL} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            let copyState = [...todoLists];
            return copyState.map(tl => tl.id === action.todoListId ? {...tl, filter: action.newFilterValue} : tl)
        }
        default:
            return todoLists;
    }
}

export const RemoveTodoListAC = (todoListID: string): RemoveTodoListType => {
    return {type: "REMOVE-TODOLIST", todoListID}
}

export const AddTodoListAC = (titleTL: string): AddTodoListType => {
    return {
        type: "ADD-TODOLIST",
        titleTL,
        todoListId: v1()
    }
}

export const ChangeTodoListTitleAC = (titleTL: string, todoListId: string): ChangeTodoListTitleType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        titleTL,
        todoListId
    }
}

export const ChangeTodoListFilterAC = (newFilterValue: FilterValuesType, todoListId: string): ChangeTodoListFilterType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        newFilterValue,
        todoListId
    }
}












