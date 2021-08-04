export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
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

//action types
export type AppSetStatusType = ReturnType<typeof setAppStatusAC>;
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>;
export type SetAppInitialisedType = ReturnType<typeof setAppInitialisedAC>;

export type ActionsType = AppSetStatusType | SetAppErrorType | SetAppInitialisedType;