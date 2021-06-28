import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {FilterValuesType, TasksStateType, TodoListType} from '../App';
import {tasksReducer} from "./tasks-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let title1 = "DanceStyles";
    let title2 = "StretchingClasses";

    const addTodoList: Array<TodoListType> = [
        {id: v1(), title: title1, filter: "all"},
    ]

    const endState = todolistReducer(addTodoList, AddTodoListAC(title2))

    expect(endState.length).toBe(2);
    expect(endState[1].title).toBe(title2);
});

test("todolist's title should be changed", () => {
    let title1 = "DanceStyles";
    let todoListId1 = v1();

    const changeTodoList: Array<TodoListType> = [
        {id: todoListId1, title: "DanceMoves", filter: "all"},
    ]

    const endState = todolistReducer(changeTodoList, ChangeTodoListTitleAC(title1, todoListId1))

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe(title1);
});

test("todolist's filter should be changed", () => {
    let newFilterValue: FilterValuesType = "active";
    let todoListId1 = v1();

    const changeTodoListFilter: Array<TodoListType> = [
        {id: todoListId1, title: "DanceMoves", filter: "all"},
    ]

    const endState = todolistReducer(changeTodoListFilter, ChangeTodoListFilterAC(newFilterValue,todoListId1))

    expect(endState.length).toBe(1);
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

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});