import authHeader from "../services/authHeader";

const API_UPLOAD_URL = "http://localhost:8080/api/recipes/storeRecipe";
const API_DOWNLOAD_ALL_URL = "http://localhost:8080/api/recipes/getAllRecipes";
const API_GET_RECIPE_URL = "http://localhost:8080/api/recipes/getRecipeById";
const API_GET_USER_RECIPES_URL =
    "http://localhost:8080/api/recipes/getAllUserRecipes";
const API_DELETE_RECIPE_BY_ID_URL =
    "http://localhost:8080/api/recipes/deleteRecipeById";

export const storeRecipe = async (title, contents, image) => {
    let header = authHeader();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("contents", contents);

    const res = await fetch(API_UPLOAD_URL, {
        method: "post",
        body: formData,
        headers: header,
    });
    return res;
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
