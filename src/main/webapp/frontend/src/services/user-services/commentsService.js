import authHeader from "../auth-services/authHeader";

const API_GET_ALL_COMMENTS_URL =
    "http://localhost:8080/api/comments/getAllComments";
const API_GET_COMMENTS_URL =
    "http://localhost:8080/api/comments/getAllRecipeComments";
const API_ADD_COMMENT_URL = "http://localhost:8080/api/comments/addComment";
const API_DELETE_COMMENT_URL =
    "http://localhost:8080/api/comments/deleteComment";
const API_UPDATE_COMMENT_URL =
    "http://localhost:8080/api/comments/updateComment";
const API_CHANGE_COMMENT_MESSAGE_URL =
    "http://localhost:8080/api/comments/changeCommentMessage";
const API_GET_REPLIES_URL =
    "http://localhost:8080/api/comments/getCommentReplies";

export const getAllComments = async () => {
    const res = await fetch(API_GET_ALL_COMMENTS_URL, {
        method: "get",
    });
    return res;
};

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

export const addComment = async (
    recipe_id,
    user_id,
    message,
    reply_comment_id
) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_ADD_COMMENT_URL, {
        method: "put",
        body: JSON.stringify({
            recipe_id,
            user_id,
            message,
            reply_comment_id,
        }),
        headers: header,
    });
    return res;
};

export const deleteComment = async (comment_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_DELETE_COMMENT_URL, {
        method: "delete",
        body: JSON.stringify({
            comment_id: comment_id,
        }),
        headers: header,
    });
    return res;
};

export const updateComment = async (comment_id, user_id, recipe_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_UPDATE_COMMENT_URL, {
        method: "post",
        body: JSON.stringify({
            comment_id: comment_id,
            user_id: user_id,
            recipe_id: recipe_id,
        }),
        headers: header,
    });
    return res;
};

export const changeCommentMessage = async (comment_id, newMessage) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_CHANGE_COMMENT_MESSAGE_URL, {
        method: "post",
        body: JSON.stringify({
            comment_id: comment_id,
            message: newMessage,
        }),
        headers: header,
    });
    return res;
};

export const fetchReplies = async (comment_id) => {
    return fetch(`${API_GET_REPLIES_URL}?id=${comment_id}`, {
        method: "get",
    }).then((response) => response.json());
};
