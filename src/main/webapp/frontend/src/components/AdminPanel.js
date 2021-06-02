import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { hasAdminAuthority } from "../services/authService";
import { deleteRecipeById, getAllRecipes } from "../services/recipeService";
import { deleteUserById, getAllUsers } from "../services/userService";
import { RecipesTable } from "./RecipesTable";
import { UsersTable } from "./UsersTable";

export const AdminPanel = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [toggleDisplay, setToggleDisplay] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (hasAdminAuthority(user) === false) {
            history.push("/");
            window.location.reload();
        }
    }, [history]);

    useEffect(() => {
        getAllUsers()
            .then((res) => res.json())
            .then((json) => {
                setUsers(json);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        getAllRecipes()
            .then((res) => res.json())
            .then((json) => {
                setRecipes(json.recipes);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const editRecipeEntry = (record, index) => {
        console.log(record);
        console.log(index);
    };

    const deleteRecipeEntry = (record, index) => {
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

    const editUserEntry = (record, index) => {};

    const deleteUserEntry = (record, index) => {
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

    const displayRecipesTable = () => {
        setToggleDisplay(false);
    };

    const displayUsersTable = () => {
        setToggleDisplay(true);
    };

    return (
        <div className="container pb-4">
            <p
                className="display-4 text-center my-4"
                style={{ color: "#683ed1" }}
            >
                Admin Panel
            </p>

            <div className="text-center">
                <button
                    className="btn btn-primary"
                    onClick={displayUsersTable}
                    style={{ marginRight: "15px" }}
                >
                    Users Table
                </button>
                <button
                    className="btn btn-primary"
                    onClick={displayRecipesTable}
                >
                    Recipes Table
                </button>
            </div>

            {toggleDisplay ? (
                <UsersTable
                    users={users}
                    editCallback={editUserEntry}
                    deleteCallback={deleteUserEntry}
                />
            ) : (
                <RecipesTable
                    recipes={recipes}
                    editCallback={editRecipeEntry}
                    deleteCallback={deleteRecipeEntry}
                />
            )}
        </div>
    );
};
