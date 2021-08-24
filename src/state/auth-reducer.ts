import {Dispatch} from "redux";
import {authApi, LogInType} from "../api/todolist-api";
import {AppSetStatusType, SetAppErrorType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
// export type InitialStateType = typeof initialState;

//redux Toolkit createSlice method
const slice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setIsloggedInAC(state, action: any) {
            state.isLoggedIn = action.value
        }}
})

//login reducer
export const authReducer = slice.reducer;

//thunk
export const loginTC = (loginInfo: LogInType) => (dispatch: ThunkLoginDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn(loginInfo)
        .then( (res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: ThunkLoginDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logOut()
        .then( (res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

//action types
export type IsLoggedInType = ReturnType<typeof setIsloggedInAC>;
export type ActionType = IsLoggedInType;

type ThunkLoginDispatch = Dispatch<ActionType | AppSetStatusType | SetAppErrorType>