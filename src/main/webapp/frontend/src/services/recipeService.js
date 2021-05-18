import authHeader from "../services/authHeader";

const API_UPLOAD_URL = "http://localhost:8080/api/recipes/storeRecipe";
const API_DOWNLOAD_ALL_URL = "http://localhost:8080/api/recipes/getAllRecipes";

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
