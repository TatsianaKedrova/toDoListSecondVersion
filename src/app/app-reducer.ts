import {Dispatch} from "redux";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}

export type InitialStateType = typeof initialState;

//reducer
export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch(action.type) {
        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state;
    }
}

//action creators
export const setAppStatusAC = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const);

export const setAppErrorAC = (error: null | string) => ({ type: "APP/SET-ERROR", error } as const);

//thunk
// export const setAppStatusTC = () => (dispatch: Dispatch<ActionsType>) => {
//
// }

//action types
export type AppSetStatusType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;

export type ActionsType = AppSetStatusType | SetAppErrorType;