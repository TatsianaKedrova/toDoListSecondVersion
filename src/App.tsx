import React, { useState } from "react";
import { v1 } from "uuid";
import './App.css';
import TodoList from "./ToDolist";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";



export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "complete";

export type TodoListType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}

export type TasksStateType = {
    [key: string] : Array<TaskType>
}

function App() {

    const todoList_1 = v1();
    const todoList_2 = v1();

    const [tasks, setTasks] = useState<TasksStateType>({
       [todoList_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JAVASCRIPT", isDone: false},

        ],
        [todoList_2]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "JAVASCRIPT", isDone: false},
        ],

    });
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoList_1, title: "What to cook today?", filter: "all"},
        {id: todoList_2, title: "Where to go today?", filter: "all"},
    ])
        


    function removeTask(taskID: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].filter(task => task.id !== taskID)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks})
        // setTasks(tasks.filter(task => task.id !== taskID));
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        };
        const updatedTasks = [newTask, ...tasks[todoListID]];
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        });
    }
    function changeTaskStatus(taskID: string,  newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(task => task.id === taskID ? {...task, isDone: newIsDone} : task)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }
    function changeTaskTitle(taskID: string,  title: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(task => task.id === taskID ? {...task, title} : task)
        setTasks({
            ...tasks,
            [todoListID]: updatedTasks
        })
    }

    function removeTodoList(todoListID: string) {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }
    function addTodoList(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filter: "all"};
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl)
        setTodoLists(updatedTodoList)
    }
    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: newFilterValue} : tl)
        setTodoLists(updatedTodoLists);
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

    const todoListComponents = todoLists.map(tl => {
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
};

export default App;

console.log("I love");

