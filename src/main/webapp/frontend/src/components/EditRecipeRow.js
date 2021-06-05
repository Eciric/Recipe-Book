import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { updateRecipe } from "../services/recipeService";

export const EditRecipeRow = ({ record, setEditing }) => {
    const [title, setTitle] = useState("");
    const [userid, setUserid] = useState("");

    const saveData = () => {
        let id = record.id;
        let newTitle = title || record.title;
        let newUserid = userid || record.userID;
        updateRecipe(id, newTitle, newUserid)
            .then((res) => {
                if (res.ok) {
                    setEditing(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleUseridChange = (e) => {
        setUserid(e.target.value);
    };

    return (
        <div className="container text-center editUser my-2">
            <h1 className="display-5 py-3">RecipeID: {record.id}</h1>
            <TextField
                label="Edit title..."
                value={title}
                onChange={handleTitleChange}
            />
            <p style={{ paddingTop: "5px" }}>Title: {record.title}</p>
            <TextField
                label="Edit user id..."
                value={userid}
                onChange={handleUseridChange}
            />
            <p style={{ paddingTop: "5px" }}>User_id: {record.userID}</p>

            <button className="btn btn-primary my-5" onClick={saveData}>
                Save Edit
            </button>
        </div>
    );
};
