import {Dispatch} from "redux";
import {authApi, LogInType} from "../api/todolist-api";
import {AppSetStatusType, setAppStatusAC} from "./app-reducer";
import {handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    email: "",
    password: "",
    rememberMe: false,
}

//login reducer
export const loginReducer = (loginState: LogInType = initialState, action: ActionType) => {
    switch (action.type) {

        default:
            return loginState;
    }
}

//action creators
// export const

//action types
export type ActionType = any;

//thunk
export const thunkAction = (email: string, password: string, rememberMe: boolean) => (dispatch: ThunkLoginDispatch) => {
    dispatch(setAppStatusAC("loading"))
    authApi.logIn({email, password, rememberMe})
        .then( () => {
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

type ThunkLoginDispatch = Dispatch<ActionType | AppSetStatusType>