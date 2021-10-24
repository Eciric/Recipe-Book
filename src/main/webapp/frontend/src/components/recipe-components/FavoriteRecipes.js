import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import {
    getAllUserFavorites,
    getRecipeById,
} from "../../services/recipe-services/recipeService";
import { getAllRecipeLikes } from "../../services/user-services/likeService";

export const FavoriteRecipes = () => {
    const history = useHistory();

    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        getAllUserFavorites(user.id).then(async (res) => {
            const detailedRecipes = [];
            for (let i = 0; i < res.length; i++) {
                let recipe = await (
                    await getRecipeById(res[i].recipe_id)
                ).json();
                recipe = recipe.recipes[0];
                const formattedDate = new Date(
                    recipe.recipeData.date_created
                ).toLocaleDateString("en-gb", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                detailedRecipes.push({
                    id: recipe.recipeData.recipe_id,
                    user_id: recipe.recipeData.user_id,
                    title: recipe.recipeData.title,
                    date: formattedDate,
                    img: URL.createObjectURL(
                        base64toBlob(recipe.image, "image/png")
                    ),
                });
                getAllRecipeLikes(recipe.recipeData.recipe_id)
                    .then((res) => res.json())
                    .then((json) => {
                        detailedRecipes[i].likes = json.length;
                    });
            }
            console.log(detailedRecipes);
            setFavouriteRecipes(detailedRecipes);
        });
    }, []);

    const goToRecipe = (id) => {
        history.push(`recipeview/${id}`);
    };

    return (
        <div className="favorite-recipes">
            <div className="recipes__header px-3 pt-3 pb-1">
                <h3>Favorite Recipes</h3>
            </div>
            <div className="recipes__table p-3">
                {favouriteRecipes.length > 0 ? (
                    <div className="favorites">
                        <div className="favorites__head row px-2 mb-1">
                            <div className="item__image col-3">Image</div>
                            <div className="col-3">Title</div>
                            <div className="item__likes col-3">Likes</div>
                            <div className="item__date col-3">Date created</div>
                        </div>
                        {favouriteRecipes.map((favorite) => {
                            return (
                                <div
                                    className="favorite__item row px-2 mb-4"
                                    onClick={() => {
                                        goToRecipe(favorite.id);
                                    }}
                                >
                                    <div className="item__image col-3">
                                        <img
                                            id="favorite-image"
                                            className="img-fluid"
                                            src={favorite.img}
                                            alt=""
                                        />
                                    </div>
                                    <div className="item__name col-3">
                                        {favorite.title}
                                    </div>
                                    <div className="item__likes col-3">
                                        {favorite.likes ? favorite.likes : 0}
                                    </div>
                                    <div className="item__date col-3">
                                        {favorite.date}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <p className="lead">
                            No favourite recipes?. Go <Link to="/">find</Link>{" "}
                            some now!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
