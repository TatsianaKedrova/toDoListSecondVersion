import {AddTodoListType, RemoveTodolistType, SetTodoListsType} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, TaskType, todoApi, UpdateTaskModelType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

//types
export type TasksStateType = {
    [key: string] : Array<TaskType>
}

const initState: TasksStateType = {};

// tasks reducer
export const tasksReducer = (state: TasksStateType = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "ADD-TASK":
            console.log(action)
            let newTask = action.task;
            const copyState = {...state};
            const updatedTasks = [newTask, ...copyState[newTask.todoListId]];
            return {
                ...copyState,
                [newTask.todoListId]: updatedTasks
            }
        case "REMOVE-TASK": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].filter(task => task.id !== action.taskID)
            return copyState;
        }
        case "UPDATE-TASK": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].map(task => task.id === action.taskID ? {
                ...task,
                ...action.model
            } : task);
            return copyState;
        }
        /*case "CHANGE-TASK-TITLE": {
            let copyState = {...state};
            copyState[action.todoListId] = copyState[action.todoListId].map(task => task.id === action.taskID ? {
                ...task,
                title: action.title
            } : task);
            return copyState;
        }*/

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST": {
            let copyState = {...state};
            delete copyState[action.todoListID]
            return copyState;
        }
        case "SET_TODOLISTS": {
            const copyState = {...state};
            action.todoLists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        }
        case "SET-TASK": {
            return {...state, [action.todoListId]: action.tasks}
        }
        default:
            return state;
    }
}

//action creators
export const AddTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const);
export const RemoveTaskAC = (taskID: string, todoListId: string) => ({type: "REMOVE-TASK", taskID, todoListId} as const);
export const UpdateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todoListId: string) => ({type: "UPDATE-TASK", taskID, model, todoListId} as const);
// export const ChangeTaskTitleAC = (taskID: string, title: string, todoListId: string) => ({type: "CHANGE-TASK-TITLE", taskID, title, todoListId} as const);
export const SetTaskAC = (tasks: Array<TaskType>, todoListId: string) => ({type: "SET-TASK", tasks, todoListId} as const);

//thunk
export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todoApi.fetchTasks(todoListId)
            .then(res => {
                dispatch(SetTaskAC(res.data.items, todoListId))
            })
    }
}

export const addTaskTC = (todoListId: string, taskTitle: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        todoApi.addTask(todoListId, taskTitle)
            .then( res => {
                console.log(res.data)
                dispatch(AddTaskAC(res.data.data.item))
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
        todoApi.removeTask(todoListId, taskId)
            .then( () => {
                dispatch(RemoveTaskAC(taskId,todoListId))
            })

}

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string

}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => (dispatch: Dispatch<ActionType>, getState: () => AppRootStateType) => {

    const state = getState();
    const task = state.tasks[todoListId].find( task => task.id === taskId )

    if(!task) {
        console.warn("Task not found");
        return;
    }
    const apiModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        completed: task.completed,
        startDate: task.startDate,
        ...domainModel
    }
    todoApi.changeTask(todoListId, taskId, apiModel)
        .then( res => {
            console.log(res.data.data);
            dispatch(UpdateTaskAC(taskId, domainModel,todoListId))
        } )
}


//action types
export type AddTaskType = ReturnType<typeof AddTaskAC>;
export type RemoveTaskType = ReturnType<typeof RemoveTaskAC>;
export type ChangeTaskStatusType = ReturnType<typeof UpdateTaskAC>;
// export type ChangeTaskTitleType = ReturnType<typeof ChangeTaskTitleAC>;
export type SetTaskType = ReturnType<typeof SetTaskAC>;

type ActionType =
      AddTaskType
    | RemoveTaskType
    | ChangeTaskStatusType
    // | ChangeTaskTitleType
    | AddTodoListType
    | RemoveTodolistType
    | SetTodoListsType
    | SetTaskType










