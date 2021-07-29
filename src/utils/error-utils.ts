import {Dispatch} from "redux";
import {AppSetStatusType, setAppErrorAC, SetAppErrorType, setAppStatusAC} from "../app/app-reducer";
import { ResponseType } from "../api/todolist-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<AppSetStatusType | SetAppErrorType>) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred!"))
    }
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
