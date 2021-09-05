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

//this is type of rootreducer function by itself
export type RootReducerType = typeof rootReducer;

// export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
});

//this is type of the state that is being returned from the rootReducer function
export type AppRootStateType = ReturnType<RootReducerType>

// @ts-ignore
window.store = store;


