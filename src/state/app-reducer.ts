import {Dispatch} from "redux";
import {authApi} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {IsLoggedInType, setIsloggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState;

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALISED":
            return {...state, isInitialized: action.isInitialised}
        default:
            return state;
    }
}

//action creators
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const);
export const setAppErrorAC = (error: null | string) => ({ type: "APP/SET-ERROR", error } as const);
export const setAppInitialisedAC = (isInitialised: boolean) => ({ type: "APP/SET-INITIALISED", isInitialised } as const);

export const initialiseAppTC = () => (dispatch: DispatchAppThunkType) => {
    authApi.me()
        .then(res => {
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitialisedAC(true))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}

//action types
export type AppSetStatusType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type SetAppInitialisedType = ReturnType<typeof setAppInitialisedAC>;

export type ActionsType = AppSetStatusType | SetAppErrorType | SetAppInitialisedType;
export type DispatchAppThunkType = Dispatch<ActionsType | AppSetStatusType | SetAppErrorType | IsLoggedInType>;