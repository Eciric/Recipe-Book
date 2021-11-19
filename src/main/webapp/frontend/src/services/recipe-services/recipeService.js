import authHeader from "../auth-services/authHeader";

const API_UPLOAD_URL = "http://localhost:8080/api/recipes/storeRecipe";
const API_DOWNLOAD_ALL_URL = "http://localhost:8080/api/recipes/getAllRecipes";
const API_GET_RECIPE_URL = "http://localhost:8080/api/recipes/getRecipeById";
const API_UPDATE_RECIPE_URL = "http://localhost:8080/api/recipes/updateRecipe";
const API_GET_USER_RECIPES_URL =
    "http://localhost:8080/api/recipes/getAllUserRecipes";
const API_DELETE_RECIPE_BY_ID_URL =
    "http://localhost:8080/api/recipes/deleteRecipeById";
const API_GET_USER_FAVORITES_URL =
    "http://localhost:8080/api/recipes/getAllFavoriteRecipesByUserId";
const API_ADD_USER_FAVORITE_URL =
    "http://localhost:8080/api/recipes/addFavoriteRecipe";
const API_DELETE_USER_FAVORITE_URL =
    "http://localhost:8080/api/recipes/deleteFavoriteRecipe";
export const storeRecipe = async (title, contents, files) => {
    let header = authHeader();
    const formData = new FormData();
    formData.append("files", files);
    formData.append("title", title);
    formData.append("contents", contents);

    const res = await fetch(API_UPLOAD_URL, {
        method: "post",
        body: formData,
        headers: header,
    });
    return res.json();
};

export const getAllRecipes = async () => {
    const res = await fetch(API_DOWNLOAD_ALL_URL, {
        method: "get",
    });
    return res;
};

export const getAllUserRecipes = async (id) => {
    const res = await fetch(API_GET_USER_RECIPES_URL, {
        method: "post",
        body: JSON.stringify({
            id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const getRecipeById = async (id) => {
    const res = await fetch(API_GET_RECIPE_URL, {
        method: "post",
        body: JSON.stringify({
            id: id,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res;
};

export const deleteRecipeById = async (id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    const res = await fetch(API_DELETE_RECIPE_BY_ID_URL, {
        method: "delete",
        body: JSON.stringify({
            id: id,
        }),
        headers: header,
    });
    return res;
};

export const updateRecipe = async (id, title, user_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_UPDATE_RECIPE_URL, {
        method: "post",
        body: JSON.stringify({
            recipe_id: id,
            title: title,
            user_id: user_id,
        }),
        headers: header,
    });
};

export const getAllUserFavorites = async (user_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(`${API_GET_USER_FAVORITES_URL}?id=${user_id}`, {
        method: "get",
        headers: header,
    }).then((response) => response.json());
};

export const addUserFavoriteRecipe = async (user_id, recipe_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_ADD_USER_FAVORITE_URL, {
        method: "put",
        body: JSON.stringify({
            user_id,
            recipe_id,
        }),
        headers: header,
    }).then((response) => response.json());
};

export const deleteUserFavoriteRecipe = async (favorite_id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(`${API_DELETE_USER_FAVORITE_URL}?id=${favorite_id}`, {
        method: "delete",
        headers: header,
    }).then((response) => response.json());
};
