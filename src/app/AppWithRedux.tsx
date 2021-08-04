import React, {useEffect} from "react";
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


type AppPropsType = {
    demo?: boolean
};

function AppWithRedux({demo = false}: AppPropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);
    const isInitialised = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    console.log(isInitialised);

    useEffect(() => {

        dispatch(initialiseAppTC())
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
                    <Button color="inherit">{isLoggedIn && LogOut}</Button>
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


