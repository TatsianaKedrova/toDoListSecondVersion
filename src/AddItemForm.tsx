import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemPropsType) => {

    console.log("AddItemForm is called");

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value);
    }

    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title);
        } else {
            setError("Title is required!")
        }
        setTitle("");
    }

    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null);
        }
        if (e.key === "Enter") {
            addItemHandler();
        }
    }
    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton onClick={addItemHandler} color={"primary"}>
                <AddBox  />
            </IconButton>

        </div>
    );
})

export default AddItemForm;