import React, { ChangeEvent } from 'react';
import {FilterValuesType, TaskType, } from './App';
import { useState, KeyboardEvent } from 'react';

// 
type TodoListPropsType = {
    title: string,
    todoListFilter: FilterValuesType,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    removeTask: (taskID: string) => void,
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void,
    changeTaskStatus: (taskID: string,  newIsDone: boolean) => void
}



function TodoList(props: TodoListPropsType) {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)
    const tasks = props.tasks.map( task => {
        const remoteTask = () => props.removeTask(task.id)
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)
        return (
            <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeStatus}/>
                <span>{task.title}</span>
                <button
                className="btn-remove"
                onClick={remoteTask}>X</button>
            </li>
        ) 

    });
    //() => props.removeTask(task.id)
    
    const setAllFilterValue = () => props.changeTodoListFilter("all");
    const setActiveFilterValue = () => props.changeTodoListFilter("active");
    const setCompleteFilterValue = () => props.changeTodoListFilter("complete");
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value);
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(title);
        } else {
            setError("Title is required!")
        }
        setTitle("");
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
                />
                <button onClick = {addTask}>+</button>
                {error && <div className={"error-text"}>{error}</div>}
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button
                    className = {props.todoListFilter === "all" ? "active-filter" : ""}
                    onClick={setAllFilterValue}
                >All</button>
                <button
                    className = {props.todoListFilter === "active" ? "active-filter" : ""}
                    onClick={setActiveFilterValue}>Active</button>
                <button
                    className = {props.todoListFilter === "complete" ? "active-filter" : ""}
                    onClick={setCompleteFilterValue}>Completed</button>
            </div>
        </div>

    );
}

export default TodoList;




