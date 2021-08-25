import {Dispatch} from "redux";
import {authApi} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsloggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState;

//redux toolkit createSlice method
const slice = createSlice({
    initialState,
    name: "app",
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status: RequestStatusType}>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: null | string}>) {
            state.error = action.payload.error
        },
        setAppInitialisedAC(state, action: PayloadAction<{isInitialised: boolean}>) {
         state.isInitialized = action.payload.isInitialised
        }

    }
})

//reducer
export const appReducer = slice.reducer;

//action creators
export const {setAppStatusAC, setAppErrorAC, setAppInitialisedAC} = slice.actions;


export const initialiseAppTC = () => (dispatch: Dispatch) => {
    authApi.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC({value: true}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitialisedAC({isInitialised: true}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
};
