import {Dispatch} from "redux";
import {authApi, LogInType} from "../api/todolist-api";
import {setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}

//redux Toolkit createSlice method
const slice = createSlice({
    initialState,
    name: "auth",
    reducers: {
        setIsloggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn = action.payload.value
        }}
})

//login reducer
export const authReducer = slice.reducer;
export const {setIsloggedInAC}= slice.actions;

//thunk
export const loginTC = (loginInfo: LogInType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn(loginInfo)
        .then( (res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({value: true}))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logOut()
        .then( (res) => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({value: false}))
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
