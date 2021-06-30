import React from "react";
import './App.css';
import TodoList from "./ToDolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    TasksStateType
} from "./state/tasks-reducer";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from "./state/todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";




export type FilterValuesType = "all" | "active" | "complete";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

function AppWithRedux() {
    console.log("AppWithRedux is called");

    const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();

    function removeTask(taskID: string, todoListID: string) {
        const action = RemoveTaskAC(taskID, todoListID);
        dispatch(action);
    }

    function addTask(title: string, todoListId: string) {
        const action = AddTaskAC(title, todoListId);
        dispatch(action);
    }

    function changeTaskStatus(taskID: string,  newIsDone: boolean, todoListID: string) {
        const action = ChangeTaskStatusAC(taskID, newIsDone, todoListID);
        dispatch(action);
    }

    function changeTaskTitle(taskID: string,  title: string, todoListID: string) {
        dispatch(ChangeTaskTitleAC(taskID,title,todoListID));

    }

    function removeTodoList(todoListID: string) {
        const action = RemoveTodoListAC(todoListID);
        dispatch(action);

    }

    function addTodoList(title: string) {
        const action = AddTodoListAC(title);
        dispatch(action);

    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const action = ChangeTodoListTitleAC(title,todoListID);
        dispatch(action);
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const action = ChangeTodoListFilterAC(newFilterValue, todoListID);
        dispatch(action);

    }


    function getTasksForTodoList(todoList: TodoListType) {
        switch(todoList.filter) {
            case 'active':
                return tasks[todoList.id].filter(task => !task.isDone)
            case 'complete':
                return tasks[todoList.id].filter(task => task.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const todoListComponents = todolists.map(tl => {
        let newArr = getTasksForTodoList(tl)
        console.log(newArr)

        return (
            <Grid item={true} key = {tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <TodoList

                        id = {tl.id}
                        title = {tl.title}
                        todoListFilter={tl.filter}
                        tasks={newArr}
                        addTask = {addTask}
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


