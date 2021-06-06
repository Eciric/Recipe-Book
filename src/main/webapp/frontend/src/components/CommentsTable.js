import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useHistory } from "react-router-dom";
import { deleteComment } from "../services/commentsService";
import { EditCommentRow } from "./EditCommentRow";

export const CommentsTable = ({ comments }) => {
    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const [editRecord, setEditRecord] = useState({});

    const editEntry = (record) => {
        setEditing(true);
        setEditRecord(record);
    };

    const deleteEntry = (record) => {
        deleteComment(record.id)
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
        { text: "UserID", key: "userid", sortable: true },
        { text: "Date", key: "date", sortable: true },
        { text: "RecipeID", key: "recipeid", sortable: true },
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
                                deleteEntry(record);
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
    if (comments) {
        comments.forEach((row) => {
            let formattedDate = new Date(row.date_created).toLocaleDateString(
                "en-gb",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );

            data.push({
                id: row.comment_id,
                userid: row.user_id,
                date: formattedDate,
                recipeid: row.recipe_id,
            });
        });
    }

    return (
        <div>
            {editing ? (
                <EditCommentRow record={editRecord} setEditing={setEditing} />
            ) : (
                <ReactDatatable columns={columns} records={data} />
            )}
        </div>
    );
};
