import {Dispatch} from "redux";
import {authApi, LogInType} from "../api/todolist-api";
import {AppSetStatusType, SetAppErrorType, setAppStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    email: "",
    password: "",
    rememberMe: false,
}

//login reducer
export const loginReducer = (loginState: LogInType = initialState, action: ActionType):LogInType => {
    switch (action.type) {
        case "SET-LOGIN":
            return {...loginState, email: action.loginInfo.email, password: action.loginInfo.password, rememberMe: action.loginInfo.rememberMe}
        default:
            return loginState;
    }
}

//action creators
export const loginAC = (loginInfo: LogInType) => ({type: "SET-LOGIN", loginInfo } as const);

//action types
export type LoginACType = ReturnType<typeof loginAC>;
export type ActionType = LoginACType;

//thunk
export const loginTC = (loginInfo: LogInType) => (dispatch: ThunkLoginDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn(loginInfo)
        .then( (res) => {
            console.log(res.data.data.userId)
            if(res.data.resultCode === 0) {
                dispatch(loginAC(loginInfo))
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