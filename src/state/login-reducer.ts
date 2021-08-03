import {Dispatch} from "redux";
import {LogInType} from "../api/todolist-api";

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

}

type ThunkLoginDispatch = Dispatch<ActionType>