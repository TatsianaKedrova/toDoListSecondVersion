import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "./api/todolist-api";


type TaskPropsType = {
    task: TaskType
    removeTask: (taskId:string) => void
    changeTaskStatus: (taskId:string, newStatusValue: TaskStatuses) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}

export const Task = React.memo((
    {
        task,
        removeTask,
        changeTaskStatus,
        changeTaskTitle
    }: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newStatusValue);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }, [changeTaskTitle, task.id])
    return(
        <div key={task.id} className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <Checkbox
                checked={task.status === TaskStatuses.Completed}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    )
});