import React, {useCallback, useEffect} from "react";
import './App.css';
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Menu} from "@material-ui/icons";
import ErrorSnackbar from "../components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {initialiseAppTC, RequestStatusType} from "../state/app-reducer";
import {Login} from "../features/Login/Login";
import {Switch, Route, Redirect} from "react-router-dom";
import {logOutTC} from "../state/auth-reducer";



type AppPropsType = {
    demo?: boolean
};

function AppWithRedux({demo = false}: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isInitialised = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(initialiseAppTC())
    }, [])

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC());
    }, [])


    if(!isInitialised) {
        return <div style={{position: "fixed", width: "100%", top: "30%", textAlign: "center"}}>
            <CircularProgress />
        </div>
    }

    return (
        <div className="App">

            <ErrorSnackbar/>

            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logOutHandler}>Log out</Button> }
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/todolist-it-incubator'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/todolist-it-incubator/login'} render={() => <Login/>}/>
                    <Route path={'/todolist-it-incubator/404'} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                    <Redirect from={'*'} to={'/todolist-it-incubator/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default AppWithRedux;


