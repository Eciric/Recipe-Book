import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { hasAdminAuthority } from "../services/authService";

export const AdminPanel = () => {
    const history = useHistory();

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (hasAdminAuthority(user) === false) {
            history.push("/");
            window.location.reload();
        }
        console.log("test2");
    }, [history]);

    console.log("test3");
    return (
        <div className="container">
            <p className="display-2">Admin Panel</p>
        </div>
    );
};
