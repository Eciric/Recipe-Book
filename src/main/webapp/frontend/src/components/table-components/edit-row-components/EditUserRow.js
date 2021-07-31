import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { updateUser } from "../../../services/user-services/userService";

export const EditUserRow = ({ record, index, setEditing }) => {
    const [roles, setRoles] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const saveData = () => {
        let id = record.id;
        let name = username || record.name;
        let newEmail = email || record.email;
        let newRoles = roles || record.roles;
        let formattedRoles = newRoles.split(" ").filter((role) => {
            return role === "ROLE_ADMIN" || role === "ROLE_USER";
        });
        console.log(formattedRoles);
        updateUser(id, name, formattedRoles, newEmail)
            .then((res) => {
                if (res.ok) {
                    setEditing(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRolesChange = (e) => {
        setRoles(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="container text-center editUser my-2">
            <h1 className="display-5 pt-3">UserID: {record.id}</h1>
            <TextField
                label="Edit username..."
                value={username}
                onChange={handleUsernameChange}
            />
            <p style={{ paddingTop: "5px" }}>Username: {record.name}</p>
            <TextField
                label="Edit roles..."
                value={roles}
                onChange={handleRolesChange}
            />
            <p style={{ paddingTop: "5px" }}>Roles: {record.roles}</p>
            <TextField
                label="Edit email..."
                value={email}
                onChange={handleEmailChange}
            />
            <p style={{ paddingTop: "5px" }}>Email: {record.email}</p>
            <button className="btn btn-primary my-5" onClick={saveData}>
                Save Edit
            </button>
        </div>
    );
};
