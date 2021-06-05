import React, { useState } from "react";
import ReactDatatable from "@ashvin27/react-datatable";
import { useHistory } from "react-router-dom";
import { deleteUserById } from "../services/userService";
import { EditUserRow } from "./EditUserRow";

export const UsersTable = ({ users }) => {
    const history = useHistory();
    const [editing, setEditing] = useState(false);
    const [editRecord, setEditRecord] = useState({});
    const [editIndex, setEditIndex] = useState(undefined);

    const editEntry = (record, index) => {
        setEditing(true);
        setEditRecord(record);
        setEditIndex(index);
    };

    const deleteEntry = (record, index) => {
        deleteUserById(record.id)
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
        { text: "Name", key: "name", sortable: true },
        { text: "Roles", key: "roles", sortable: true },
        { text: "Email", key: "email", sortable: true },
        { text: "Date", key: "date", sortable: true },
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
    if (users) {
        users.forEach((row) => {
            let formattedDate = new Date(row.date_created).toLocaleDateString(
                "en-gb",
                {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }
            );
            let rolesString = row.roles.reduce(
                (previousValue, currentValue) => {
                    return (previousValue += currentValue.name + " ");
                },
                ""
            );
            data.push({
                id: row.user_id,
                name: row.username,
                roles: rolesString,
                email: row.email,
                date: formattedDate,
            });
        });
    }

    return (
        <div>
            {editing ? (
                <EditUserRow
                    record={editRecord}
                    index={editIndex}
                    setEditing={setEditing}
                />
            ) : (
                <ReactDatatable columns={columns} records={data} />
            )}
        </div>
    );
};
