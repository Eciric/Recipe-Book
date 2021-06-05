import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useHistory } from "react-router-dom";
import { deleteRecipeById } from "../services/recipeService";
import { EditRecipeRow } from "./EditRecipeRow";

export const RecipesTable = ({ recipes }) => {
    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const [editRecord, setEditRecord] = useState({});

    const editEntry = (record) => {
        setEditing(true);
        setEditRecord(record);
    };

    const deleteEntry = (record, index) => {
        deleteRecipeById(record.id)
            .then((res) => {
                if (res.ok) {
                    history.push("/adminpanel");
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let columns = [
        { text: "ID", key: "id", sortable: true },
        { text: "Title", key: "title", sortable: true },
        { text: "Date", key: "date", sortable: true },
        { text: "UserID", key: "userID", sortable: true },
        {
            key: "action",
            text: "Action",
            cell: (record, index) => {
                return (
                    <div className="text-center">
                        <button
                            className="btn btn-secondary btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                                editEntry(record, index);
                            }}
                        >
                            Edit
                            <i
                                className="fa fa-edit"
                                style={{ paddingLeft: "5px" }}
                            ></i>
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                                deleteEntry(record, index);
                            }}
                        >
                            Delete
                            <i
                                className="fa fa-trash"
                                style={{ paddingLeft: "5px" }}
                            ></i>
                        </button>
                    </div>
                );
            },
        },
    ];

    let data = [];
    if (recipes) {
        recipes.forEach((row) => {
            let formattedDate = new Date(
                row.recipeData.date_created
            ).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            data.push({
                id: row.recipeData.recipe_id,
                title: row.recipeData.title,
                date: formattedDate,
                userID: row.recipeData.user_id,
            });
        });
    }

    return (
        <div>
            {editing ? (
                <EditRecipeRow record={editRecord} setEditing={setEditing} />
            ) : (
                <ReactDatatable columns={columns} records={data} />
            )}
        </div>
    );
};
