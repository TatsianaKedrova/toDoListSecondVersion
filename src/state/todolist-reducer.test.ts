import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {FilterValuesType, TodoListType} from "../AppWithRedux";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let title2 = "StretchingClasses";

    const endState = todolistReducer(startState, AddTodoListAC(title2))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(title2);
});

test("todolist's title should be changed", () => {
    let title1 = "DanceStyles";

    const endState = todolistReducer(startState, ChangeTodoListTitleAC(title1, todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(title1);
});

test("todolist's filter should be changed", () => {
    let newFilterValue: FilterValuesType = "active";

    const endState = todolistReducer(startState, ChangeTodoListFilterAC(newFilterValue,todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilterValue);
    expect(endState[0].filter).toBe("active");
});

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListAC("My nearest future plans");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});