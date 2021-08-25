import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "../state/app-reducer";
import { ResponseType } from "../api/todolist-api";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if(data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: "Some error occurred!"}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
};

export const handleServerNetworkError = (error: { message: string }, dispatch:Dispatch) => {
    dispatch(setAppErrorAC({error: error.message ? error.message :"Some error occurred!"}));
    dispatch(setAppStatusAC({status: "failed"}))
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
