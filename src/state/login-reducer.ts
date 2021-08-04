import {Dispatch} from "redux";
import {authApi, LogInType} from "../api/todolist-api";
import {AppSetStatusType, SetAppErrorType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

export type InitialLoginStateType = {
    isLoggedIn: boolean
}

//login reducer
export const loginReducer = (loginState: InitialLoginStateType = initialState, action: ActionType):InitialLoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...loginState, isLoggedIn: !action.value}
        default:
            return loginState;
    }
}

//action creators
export const setIsloggedInAC = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const);

//action types
export type IsLoggedInType = ReturnType<typeof setIsloggedInAC>;
export type ActionType = IsLoggedInType;

//thunk
export const loginTC = (loginInfo: LogInType) => (dispatch: ThunkLoginDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn(loginInfo)
        .then( (res) => {
            console.log(res.data.data.userId)
            if(res.data.resultCode === 0) {
                dispatch(setIsloggedInAC(loginInfo))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

type ThunkLoginDispatch = Dispatch<ActionType | AppSetStatusType | SetAppErrorType>