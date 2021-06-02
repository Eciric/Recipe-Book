import React from "react";
import ReactDatatable from "@ashvin27/react-datatable";

export const RecipesTable = ({ recipes, editCallback, deleteCallback }) => {
    let columns = [
        { text: "ID", key: "id", sortable: true },
        { text: "Title", key: "title", sortable: true },
        { text: "Likes", key: "likes", sortable: true },
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
                                editCallback(record, index);
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
                                deleteCallback(record, index);
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
                likes: row.recipeData.likes,
                date: formattedDate,
                userID: row.recipeData.user_id,
            });
        });
    }

    return (
        <div>
            <ReactDatatable columns={columns} records={data} />
        </div>
    );
};
