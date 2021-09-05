import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach( () => {
    startState = {
        status: "idle",
        error: null,
        isInitialized: false

    }
})

test("request status type should be changed", () => {

    const action = setAppStatusAC({status: "loading"});
    const endState = appReducer(startState, action);

    expect(endState.status).toBe("loading");
    expect(endState.status).not.toBe("idle");
    expect(endState.error).toBe(null);

})

test("error state should change", () => {

    const action = setAppErrorAC({error: "There is error"});
    const endState = appReducer(startState, action);

    expect(endState.status).toBe("idle");
    expect(endState.error).not.toBe(null);
    expect(endState.error).toBe("There is error");

})