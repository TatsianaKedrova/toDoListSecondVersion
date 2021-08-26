import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodolistTitleTC,
    fetchTodoListsTC,
    FilterValuesType,
    removeTodoListTC,
    TodolistDomainType
} from "../../state/todolist-reducer";
import {addTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "../../state/tasks-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import TodoList from "./TodoList/TodoList";
import AddItemForm from "../AddItemForm/AddItemForm";
import {Redirect} from "react-router-dom";

export type TodolistsListPropsType = {
    demo: boolean
}

export const TodolistsList: React.FC<TodolistsListPropsType> = ({demo = false}) => {
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    console.log(tasks);

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
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
        const thunk = updateTaskTC(taskID, {status: newStatus}, todoListID);
        dispatch(thunk);
    }, [dispatch]);

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        const thunk = updateTaskTC(taskID, {title}, todoListID);
        dispatch(thunk);
    }, [dispatch]);

    const removeTodoList = useCallback((todoListID: string) => {
        const thunk = removeTodoListTC(todoListID)
        dispatch(thunk);
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title);
        dispatch(thunk);
    }, [dispatch]);

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const thunk = changeTodolistTitleTC(todoListID, title);
        dispatch(thunk);
    }, [dispatch]);

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string) => {
        const action = changeTodoListFilterAC({newFilterValue: newFilterValue,todoListId: todoListID});
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

    if(!isLoggedIn) {
        return <Redirect to={"/todolist-it-incubator/login"} />
    }

    const todoListComponents = todoLists.map(tl => {
        let newArr = getTasksForTodoList(tl)
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

    return <>
        <Grid container={true} style={{padding: "20px 0px"}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container={true} spacing={5}>
            {todoListComponents}
        </Grid>
    </>
}

