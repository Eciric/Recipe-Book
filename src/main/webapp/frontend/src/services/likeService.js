import authHeader from "../services/authHeader";

const API_GET_ALL_LIKES_URL = "http://localhost:8080/api/likes/getAllLikes";
const API_GET_USER_LIKES_URL =
    "http://localhost:8080/api/likes/getAllUserLikes";
const API_GET_ALL_RECIPE_LIKES_URL =
    "http://localhost:8080/api/likes/getAllRecipeLikes";
const API_DELETE_LIKE_URL = "http://localhost:8080/api/likes/deleteUserLike";
const API_ADD_LIKE_URL = "http://localhost:8080/api/likes/addUserLike";

export const getAllLikes = async () => {
    const res = await fetch(API_GET_ALL_LIKES_URL, {
        method: "get",
    });
    return res;
};

export const getAllUserLikes = async (id) => {
    const res = await fetch(API_GET_USER_LIKES_URL, {
        method: "post",
        body: JSON.stringify({
            user_id: id,
            recipe_id: null,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const getAllRecipeLikes = async (id) => {
    const res = await fetch(API_GET_ALL_RECIPE_LIKES_URL, {
        method: "post",
        body: JSON.stringify({
            user_id: null,
            recipe_id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const addUserLikeToRecipe = async (user_id, recipe_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_ADD_LIKE_URL, {
        method: "put",
        body: JSON.stringify({
            user_id: user_id,
            recipe_id: recipe_id,
        }),
        headers: header,
    });
    return res;
};

export const deleteUserLikeFromRecipe = async (user_id, recipe_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_DELETE_LIKE_URL, {
        method: "delete",
        body: JSON.stringify({
            user_id: user_id,
            recipe_id: recipe_id,
        }),
        headers: header,
    });
    return res;
};
