import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {AddTodoListAC, RemoveTodoListAC, SetTodoListsAC} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {v1} from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: TasksStateType;

beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "2",
                title: "JS",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "3",
                title: "React",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                description: `newTask number todolistId2`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: `todolistId2`,
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "2",
                title: "milk",
                description: `newTask number todolistId2`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: `todolistId2`,
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "3",
                title: "tea",
                description: `newTask number todolistId2`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: `todolistId2`,
                order: 1,
                addedDate: `${new Date()}`
            }
        ]
    };
})

test('correct task should be deleted from correct array', () => {

    const action = RemoveTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1",
                title: "CSS",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "2",
                title: "JS",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "3",
                title: "React",
                description: `newTask number todolistId1`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: 'todolistId1',
                order: 1,
                addedDate: `${new Date()}`
            }
        ],
        "todolistId2": [
            {
                id: "1",
                title: "bread",
                description: `newTask number todolistId2`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: `todolistId2`,
                order: 1,
                addedDate: `${new Date()}`
            },
            {
                id: "3",
                title: "tea",
                description: `newTask number todolistId2`,
                completed: false,
                status: TaskStatuses.New,
                priority: TaskPriorities.Middle,
                startDate: `${new Date()}`,
                deadline: `${new Date().getDate() + 10}`,
                todoListId: `todolistId2`,
                order: 1,
                addedDate: `${new Date()}`
            }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = AddTaskAC("juice", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});


test('status of specified task should be changed', () => {

    const action = ChangeTaskStatusAC("2", TaskStatuses.Completed, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"].length).toBe(3);
});

test('title of specified task should be changed', () => {

    const action = ChangeTaskTitleAC("2", "Taniusha", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Taniusha");
    expect(endState["todolistId2"].length).toBe(3);
});

test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC("My husband Sherif");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = RemoveTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todoLists", () => {

    const action = SetTodoListsAC([
        {id: todolistId1, title: "What to learn", addedDate: new Date().getDate(), order: Math.random()},
        {id: todolistId2, title: "What to buy", addedDate: new Date().getDate(), order: Math.random()}
    ]);
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId2]).toStrictEqual([]);

})





