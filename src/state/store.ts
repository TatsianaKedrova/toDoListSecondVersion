import {combineReducers} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


