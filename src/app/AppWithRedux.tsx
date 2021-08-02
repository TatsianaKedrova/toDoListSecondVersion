import React from "react";
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from "@material-ui/core";
import LinearProgress from '@material-ui/core/LinearProgress';
import {Menu} from "@material-ui/icons";
import ErrorSnackbar from "../components/ErrorSnackBar/ErrorSnackBar";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {RequestStatusType} from "./app-reducer";


type AppPropsType = {
    demo?: boolean
};

function AppWithRedux({demo = false}: AppPropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default AppWithRedux;


