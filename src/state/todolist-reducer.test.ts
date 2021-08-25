import {
    addTodoListAC,
    changeTodoListFilterAC, changeTodolistStatusAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodolistDomainType,
    todolistReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {tasksReducer, TasksStateType} from "./tasks-reducer";
import {TodolistType} from "../api/todolist-api";
import {RequestStatusType} from "./app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];
let newToDoList: TodolistType;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {
            id: todolistId1,
            title: "What to learn",
            addedDate: new Date().getDate(),
            order: Math.random(),
            filter: "all",
            todolistStatus: "idle"
        },
        {
            id: todolistId2,
            title: "What to buy",
            addedDate: new Date().getDate(),
            order: Math.random(),
            filter: "all",
            todolistStatus: "idle"
        }
    ]

    newToDoList = {id: todolistId1, title: "Silly", addedDate: new Date().getDate(), order: Math.random()};

})

test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    const endState = todolistReducer(startState, addTodoListAC(newToDoList))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("Silly");
});

test("todoList's title should be changed", () => {
    let title1 = "DanceStyles";

    const endState = todolistReducer(startState, changeTodoListTitleAC(title1, todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(title1);
});

test("todoList's filter should be changed", () => {
    let newFilterValue: FilterValuesType = "active";

    const endState = todolistReducer(startState, changeTodoListFilterAC(newFilterValue, todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newFilterValue);
    expect(endState[0].filter).toBe("active");
});

test("todoList's status should be changed", () => {
    let newStatus: RequestStatusType = "succeeded";
    const endState = todolistReducer(startState, changeTodolistStatusAC(todolistId1, newStatus))

    expect(endState.length).toBe(2);
    expect(endState[0].todolistStatus).toBe(newStatus);
    expect(endState[1].todolistStatus).toBe("idle");
});

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodoListAC(newToDoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});

test('todoLists should appear on the screen after initial rendering', () => {

    let todoLists = [
        {id: todolistId1, title: "What to learn", addedDate: new Date().getDate(), order: Math.random()},
        {id: todolistId2, title: "What to buy", addedDate: new Date().getDate(), order: Math.random()}
    ]
    const action = setTodoListsAC(todoLists);
    const endState = todolistReducer(startState, action)

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].id).toBeDefined();

});