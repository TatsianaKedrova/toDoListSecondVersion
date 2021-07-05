import React, {useCallback} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./state/tasks-reducer";
import {FilterValuesType} from "./AppWithRedux";
import {Task} from "./Task";


// 
type TodoListPropsType = {
    id: string
    title: string,
    todoListFilter: FilterValuesType,
    tasks: Array<TaskType>,
    addTask: (title: string, todoListID: string) => void,
    removeTask: (taskID: string, todoListID: string) => void,
    removeTodoList: (todoListID: string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void,
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListID: string) => void,
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void,
    changeTodoListTitle: (title: string, todoListID: string) => void
}


const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("Todolist called");


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id]);
    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id), [props.changeTaskStatus, props.id]);
    const changeTaskTitle = useCallback((title: string, taskID: string) => {
        props.changeTaskTitle(taskID, title, props.id)
    }, [props.changeTaskTitle, props.id]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id]);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id]);
    const setAllFilterValue = useCallback(() => props.changeTodoListFilter("all", props.id), [props.changeTodoListFilter, props.id]);
    const setActiveFilterValue = useCallback(() => props.changeTodoListFilter("active", props.id), [props.changeTodoListFilter, props.id]);
    const setCompleteFilterValue = useCallback(() => props.changeTodoListFilter("complete", props.id), [props.changeTodoListFilter, props.id]);


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>

                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    props.tasks.map(task => <Task
                        key={task.id}
                        task={task}
                        removeTask={removeTask}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                    />)
                }
            </div>

            <div>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "all" ? "outlined" : "contained"}
                    onClick={setAllFilterValue}
                >All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "outlined" : "contained"}
                    onClick={setActiveFilterValue}
                >Active
                </Button>
                <Button

                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "complete" ? "outlined" : "contained"}
                    onClick={setCompleteFilterValue}
                >Complete
                </Button>

            </div>
        </div>

    );
});

export default TodoList;




