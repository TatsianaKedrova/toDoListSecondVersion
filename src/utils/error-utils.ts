import {Dispatch} from "redux";
import {AppSetStatusType, setAppErrorAC, SetAppErrorType, setAppStatusAC} from "../state/app-reducer";
import { ResponseType } from "../api/todolist-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppSetStatusType | SetAppErrorType>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred!"))
    }
    dispatch(setAppStatusAC("failed"))
};

export const handleServerNetworkError = (error: { message: string },dispatch:Dispatch<AppSetStatusType | SetAppErrorType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred!"));
    dispatch(setAppStatusAC("failed"))
};








































/*import {AppSetStatusType, setAppErrorAC, SetAppErrorType, setAppStatusAC} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppSetStatusType | SetAppErrorType>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred!"))
    }
    dispatch(setAppStatusAC("failed"))
}*/
