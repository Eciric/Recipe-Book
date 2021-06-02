import React from "react";
import ReactDatatable from "@ashvin27/react-datatable";

export const UsersTable = ({ users, editCallback, deleteCallback }) => {
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
            <ReactDatatable columns={columns} records={data} />
        </div>
    );
};
