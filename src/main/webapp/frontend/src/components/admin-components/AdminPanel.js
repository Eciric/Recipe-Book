import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { hasAdminAuthority } from "../../services/auth-services/authService";
import { getAllRecipes } from "../../services/recipe-services/recipeService";
import { getAllUsers } from "../../services/user-services/userService";
import { getAllComments } from "../../services/user-services/commentsService";
import { getAllLikes } from "../../services/user-services/likeService";
import { RecipesTable } from "../table-components/RecipesTable";
import { UsersTable } from "../table-components/UsersTable";
import { CommentsTable } from "../table-components/CommentsTable";
import { LikesTable } from "../table-components/LikesTable";

export const AdminPanel = () => {
    const history = useHistory();
    const [users, setUsers] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);

    const [displayUsers, setDisplayUsers] = useState(true);
    const [displayRecipes, setDisplayRecipes] = useState(false);
    const [displayComments, setDisplayComments] = useState(false);
    const [displayLikes, setDisplayLikes] = useState(false);

    // Authorize user
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (hasAdminAuthority(user) === false) {
            history.push("/");
            window.location.reload();
        }
    }, [history]);

    // Fetch users
    useEffect(() => {
        getAllUsers()
            .then((res) => res.json())
            .then((json) => setUsers(json))
            .catch((err) => console.log(err));
    }, []);

    // Fetch recipes
    useEffect(() => {
        getAllRecipes()
            .then((res) => res.json())
            .then((json) => setRecipes(json.recipes))
            .catch((err) => console.log(err));
    }, []);

    // Fetch comments
    useEffect(() => {
        getAllComments()
            .then((res) => res.json())
            .then((json) => setComments(json))
            .catch((err) => console.log(err));
    }, []);

    // Fetch likes
    useEffect(() => {
        getAllLikes()
            .then((res) => res.json())
            .then((json) => setLikes(json))
            .catch((err) => console.log(err));
    }, []);

    const clearDisplays = () => {
        setDisplayUsers(false);
        setDisplayRecipes(false);
        setDisplayComments(false);
        setDisplayLikes(false);
    };

    const displayUsersTable = () => {
        clearDisplays();
        setDisplayUsers(true);
    };

    const displayRecipesTable = () => {
        clearDisplays();
        setDisplayRecipes(true);
    };

    const displayCommentsTable = () => {
        clearDisplays();
        setDisplayComments(true);
    };

    const displayLikesTable = () => {
        clearDisplays();
        setDisplayLikes(true);
    };

    return (
        <div className="container pb-4">
            <p
                className="display-4 text-center my-4"
                style={{ color: "#683ed1" }}
            >
                Admin Panel
            </p>

            <div className="text-center mb-5">
                <button
                    className="btn btn-primary"
                    onClick={displayUsersTable}
                    style={{ margin: "15px" }}
                >
                    Users Table
                </button>
                <button
                    className="btn btn-primary"
                    onClick={displayRecipesTable}
                    style={{ margin: "15px" }}
                >
                    Recipes Table
                </button>
                <button
                    className="btn btn-primary"
                    onClick={displayCommentsTable}
                    style={{ margin: "15px" }}
                >
                    Comments Table
                </button>
                <button
                    className="btn btn-primary"
                    onClick={displayLikesTable}
                    style={{ margin: "15px" }}
                >
                    Likes Table
                </button>
            </div>

            {displayUsers && <UsersTable users={users} />}

            {displayRecipes && <RecipesTable recipes={recipes} />}

            {displayComments && <CommentsTable comments={comments} />}

            {displayLikes && <LikesTable likes={likes} />}
        </div>
    );
};
