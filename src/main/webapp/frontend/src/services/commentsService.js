import authHeader from "./authHeader";

const API_GET_COMMENTS_URL =
    "http://localhost:8080/api/comments/getAllComments";
const API_ADD_COMMENT_URL = "http://localhost:8080/api/comments/addComment";
const API_DELETE_COMMENT_URL =
    "http://localhost:8080/api/comments/deleteComment";

export const getComments = async (id) => {
    const res = await fetch(API_GET_COMMENTS_URL, {
        method: "post",
        body: JSON.stringify({
            recipe_id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    return res;
};

export const addComment = async (recipe_id, user_id, username, message) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_ADD_COMMENT_URL, {
        method: "put",
        body: JSON.stringify({
            recipe_id: recipe_id,
            user_id: user_id,
            username: username,
            message: message,
        }),
        headers: header,
    });
    return res;
};

export const deleteComment = async (recipe_id, user_id, comment_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_DELETE_COMMENT_URL, {
        method: "delete",
        body: JSON.stringify({
            recipe_id: recipe_id,
            user_id: user_id,
            comment_id: comment_id,
        }),
        headers: header,
    });
    return res;
};
