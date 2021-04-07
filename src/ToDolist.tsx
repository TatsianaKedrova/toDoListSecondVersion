import {FilterValuesType, TaskType,} from './App';
import React, {ChangeEvent, useState, KeyboardEvent} from "react";


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
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListID: string) => void
}


function TodoList(props: TodoListPropsType) {
    debugger
    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}/>
                <span>{task.title}</span>
                <button
                    className="btn-remove"
                    onClick={removeTask}>X
                </button>
            </li>
        )

    });
    //() => props.removeTask(task.id)

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const setAllFilterValue = () => props.changeTodoListFilter("all", props.id);
    const setActiveFilterValue = () => props.changeTodoListFilter("active", props.id);
    const setCompleteFilterValue = () => props.changeTodoListFilter("complete", props.id);
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value);
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(title, props.id);
        } else {
            setError("Title is required!")
        }
        setTitle("");
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <h3>{props.title}
                <button
                    onClick={removeTodoList}
                >X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={"error-text"}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className={props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={setAllFilterValue}
                >All
                </button>
                <button
                    className={props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={setActiveFilterValue}>Active
                </button>
                <button
                    className={props.todoListFilter === "complete" ? "active-filter" : ""}
                    onClick={setCompleteFilterValue}>Completed
                </button>
            </div>
        </div>

    );
}

export default TodoList;




