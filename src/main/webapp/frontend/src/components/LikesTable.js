import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useHistory } from "react-router-dom";
import { deleteUserLikeFromRecipe } from "../services/likeService";
import { EditLikeRow } from "../components/EditLikeRow";

export const LikesTable = ({ likes }) => {
    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const [editRecord, setEditRecord] = useState({});

    const editEntry = (record) => {
        setEditing(true);
        setEditRecord(record);
    };

    const deleteEntry = (record) => {
        deleteUserLikeFromRecipe(record.id)
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
    if (likes) {
        likes.forEach((row) => {
            data.push({
                id: row.like_id,
                userid: row.user_id,
                recipeid: row.recipe_id,
            });
        });
    }

    return (
        <div>
            {editing ? (
                <EditLikeRow record={editRecord} setEditing={setEditing} />
            ) : (
                <ReactDatatable columns={columns} records={data} />
            )}
        </div>
    );
};
