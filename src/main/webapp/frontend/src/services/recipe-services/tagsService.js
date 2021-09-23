import authHeader from "../auth-services/authHeader";

const API_GET_TAGS_BY_RECIPEID_URL =
    "http://localhost:8080/api/tags/getAllTagsByRecipeId";
const API_STORE_TAGS_URL = "http://localhost:8080/api/tags/addRecipeTags";

export const getRecipeTags = async (recipe_id) => {
    return fetch(`${API_GET_TAGS_BY_RECIPEID_URL}?id=${recipe_id}`, {
        method: "get",
    }).then((response) => response.json());
};

export const storeRecipeTags = async (user_id, recipe_id, tags) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_STORE_TAGS_URL, {
        method: "put",
        body: JSON.stringify({
            user_id,
            recipe_id,
            tags,
        }),
        headers: header,
    }).then((response) => response.json());
};
