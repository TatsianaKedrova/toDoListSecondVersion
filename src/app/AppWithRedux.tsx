import React, {useCallback, useEffect} from "react";
import './App.css';
import TodoList from "../components/TodoList/TodoList";
import AddItemForm from "../components/AddItemForm/AddItemForm";

import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Menu} from "@material-ui/icons";
import {

    addTaskTC,
    updateTaskTC,
    removeTaskTC,
    TasksStateType
} from "../state/tasks-reducer";
import {
    addTodoListTC,
    ChangeTodoListFilterAC,
    changeTodolistTitleTC, fetchTodoListsTC,
    FilterValuesType, removeTodoListTC,
    TodolistDomainType,
} from "../state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskStatuses} from "../api/todolist-api";
import ErrorSnackbar from "../components/ErrorSnackBar/ErrorSnackBar";
import {RequestStatusType} from "./app-reducer";


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTodoListsTC());
        }, []);

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const thunk = removeTaskTC(todoListID, taskID);
        dispatch(thunk);
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListId: string) => {
       const thunk = addTaskTC(todoListId, title)
        dispatch(thunk);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskID: string, newStatus: TaskStatuses, todoListID: string) => {

        const thunk = updateTaskTC(taskID,{status: newStatus},todoListID);
        dispatch(thunk);

        /*const action = ChangeTaskStatusAC(taskID, newStatus, todoListID);
        dispatch(action);*/
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const thunk = updateTaskTC(taskID, {title},todoListID);
        dispatch(thunk);

        // dispatch(ChangeTaskTitleAC(taskID, title, todoListID));
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        // const action = RemoveTodoListAC(todoListID);
        const thunk = removeTodoListTC(todoListID)
        dispatch(thunk);
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title);
        dispatch(thunk);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        // const action = ChangeTodoListTitleAC(title, todoListID);
        const thunk = changeTodolistTitleTC(todoListID, title);
        dispatch(thunk);
    }, [dispatch]);

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        const action = ChangeTodoListFilterAC(newFilterValue, todoListID);
        dispatch(action);
    }, [dispatch]);

    function getTasksForTodoList(todoList: TodolistDomainType) {
        switch (todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(task => task.status === TaskStatuses.New)
            case 'complete':
                return tasks[todoList.id].filter(task => task.status === TaskStatuses.Completed)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        let newArr = getTasksForTodoList(tl)
        // console.log(newArr)

        return (

            <Grid item={true} key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList

                        id={tl.id}
                        title={tl.title}
                        todoListFilter={tl.filter}
                        todoListStatus={tl.todolistStatus}
                        tasks={newArr}
                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">

            <ErrorSnackbar />

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;


