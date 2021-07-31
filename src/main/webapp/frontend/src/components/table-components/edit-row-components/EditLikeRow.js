import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { updateLike } from "../../../services/user-services/likeService";

export const EditLikeRow = ({ record, setEditing }) => {
    const [recipeid, setRecipeid] = useState("");
    const [userid, setUserid] = useState("");

    const saveData = () => {
        let id = record.id;
        let newUserid = userid || record.userid;
        let newRecipeid = recipeid || record.recipeid;
        updateLike(id, newUserid, newRecipeid)
            .then((res) => {
                if (res.ok) {
                    setEditing(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRecipeidChange = (e) => {
        setRecipeid(e.target.value);
    };

    const handleUseridChange = (e) => {
        setUserid(e.target.value);
    };

    return (
        <div className="container text-center editUser my-2">
            <h1 className="display-5 py-3">LikeID: {record.id}</h1>
            <TextField
                label="Edit recipe id..."
                value={recipeid}
                onChange={handleRecipeidChange}
            />
            <p style={{ paddingTop: "5px" }}>Recipe_id: {record.recipeid}</p>
            <TextField
                label="Edit user id..."
                value={userid}
                onChange={handleUseridChange}
            />
            <p style={{ paddingTop: "5px" }}>User_id: {record.userid}</p>

            <button className="btn btn-primary my-5" onClick={saveData}>
                Save Edit
            </button>
        </div>
    );
};
