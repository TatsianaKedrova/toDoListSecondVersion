import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {loginReducer} from "./login-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todolistReducer,
    app: appReducer,
    login: loginReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;


