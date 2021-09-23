import authHeader from "../auth-services/authHeader";

const API_GET_INGREDIENTS_BY_RECIPEID_URL =
    "http://localhost:8080/api/ingredients/getAllIngredientsByRecipeId";
const API_STORE_INGREDIENTS_URL =
    "http://localhost:8080/api/ingredients/addRecipeIngredients";

export const getRecipeIngredients = async (recipe_id) => {
    return fetch(`${API_GET_INGREDIENTS_BY_RECIPEID_URL}?id=${recipe_id}`, {
        method: "get",
    }).then((response) => response.json());
};

export const storeRecipeIngredients = async (
    user_id,
    recipe_id,
    ingredients
) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_STORE_INGREDIENTS_URL, {
        method: "put",
        body: JSON.stringify({
            user_id,
            recipe_id,
            ingredients,
        }),
        headers: header,
    }).then((response) => response.json());
};
