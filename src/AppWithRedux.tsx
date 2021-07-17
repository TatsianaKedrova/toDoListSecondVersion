import React, {useCallback} from "react";
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, TasksStateType} from "./state/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    FilterValuesType,
    RemoveTodoListAC,
    TodolistDomainType,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses} from "./api/todolist-api";


function AppWithRedux() {

    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        const action = RemoveTaskAC(taskID, todoListID);
        dispatch(action);
    }, [dispatch]);

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = AddTaskAC(title, todoListId);
        dispatch(action);
    }, [dispatch]);

    const changeTaskStatus = useCallback((taskID: string, newStatus: TaskStatuses, todoListID: string) => {
        const action = ChangeTaskStatusAC(taskID, newStatus, todoListID);
        dispatch(action);
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(ChangeTaskTitleAC(taskID, title, todoListID));
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        const action = RemoveTodoListAC(todoListID);
        dispatch(action);
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title);
        dispatch(action);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = ChangeTodoListTitleAC(title, todoListID);
        dispatch(action);
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
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;


