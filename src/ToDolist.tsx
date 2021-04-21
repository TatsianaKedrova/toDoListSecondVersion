import {FilterValuesType, TaskType,} from './App';
import React, {ChangeEvent} from "react";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


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


function TodoList(props: TodoListPropsType) {

    /*const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
*/
    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }

        return (
            <li key={task.id}>
                <Checkbox
                    color={"primary"}
                    checked={task.isDone}
                    onChange={changeStatus} />

                {/*<input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}/>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle} />
                {/*<span>{task.title}</span>*/}
               {/* <button
                    className="btn-remove"
                    onClick={removeTask}>X
                </button>*/}
                <IconButton onClick={removeTask}>
                    <Delete />
                </IconButton>
            </li>
        )

    });
    //() => props.removeTask(task.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    const setAllFilterValue = () => props.changeTodoListFilter("all", props.id);
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.id);
    const setCompleteFilterValue = () => props.changeTodoListFilter("complete", props.id);

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
                {/*<button
                    onClick={removeTodoList}
                >X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul style={{listStyle: "none", padding:"0px"}}>
                {tasks}
            </ul>
            <div>
                <Button
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "all" ? "outlined" : "contained"}
                    // className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={setAllFilterValue}
                >All
                </Button>
                <Button
                    style={{marginRight: "5px"}}
                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "outlined" : "contained"}
                    // className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={setActiveFilterValue}
                >Active
                </Button>
                <Button

                    size={"small"}
                    color={"primary"}
                    variant={props.todoListFilter === "complete" ? "outlined" : "contained"}
                    // className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={setCompleteFilterValue}
                >Complete
                </Button>

            </div>
        </div>

    );
}

export default TodoList;




