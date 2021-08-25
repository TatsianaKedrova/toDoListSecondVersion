import {
    AddTaskAC,
    UpdateTaskAC,
    RemoveTaskAC,
    SetTaskAC,
    tasksReducer,
    TasksStateType
} from './tasks-reducer';
import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "./todolist-reducer";
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

    const action = AddTaskAC({
        description: "new Task",
        todoListId: "todolistId2",
        title: "juice",
        addedDate: "",
        deadline: "",
        order: 1,
        status:TaskStatuses.New,
        priority: TaskPriorities.Low,
        id: "tratata",
        completed: false,
        startDate: ""
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});


test('status of specified task should be changed', () => {

    const action = UpdateTaskAC("2", {status: TaskStatuses.Completed}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"].length).toBe(3);
});

test('title of specified task should be changed', () => {

    const action = UpdateTaskAC("2", {title: "Taniusha"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Taniusha");
    expect(endState["todolistId2"].length).toBe(3);
});

test('new array should be added when new todolist is added', () => {

    let todo = {
        id: "todolistId3",
        addedDate: 28,
        order: 1,
        title: "Todo1"
    }

    const action = addTodoListAC(todo);

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

    const action = removeTodoListAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test("empty arrays should be added when we set todoLists", () => {

    const action = setTodoListsAC([
        {id: todolistId1, title: "What to learn", addedDate: new Date().getDate(), order: Math.random()},
        {id: todolistId2, title: "What to buy", addedDate: new Date().getDate(), order: Math.random()}
    ]);
    const endState = tasksReducer({}, action);
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState[todolistId1]).toStrictEqual([]);
    expect(endState[todolistId2]).toStrictEqual([]);

})

test("tasks should be added for todolist", () => {

    const action = SetTaskAC(startState["todolistId1"], "todolistId1");
    const endState = tasksReducer({
        "todolistId1": [],
        "todolistId2": [],
    }, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
    // expect(endState[todolistId2]).toStrictEqual([]);

})





