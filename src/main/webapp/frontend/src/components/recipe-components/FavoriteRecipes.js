import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
    deleteUserFavoriteRecipe,
    getAllUserFavorites,
    getRecipeById,
} from "../../services/recipe-services/recipeService";
import { getAllRecipeLikes } from "../../services/user-services/likeService";
import ReactDatatable from "@ashvin27/react-datatable";

export const FavoriteRecipes = () => {
    const history = useHistory();

    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    let columns = [
        { text: "Title", key: "title", sortable: true },
        { text: "Likes", key: "likes", sortable: true },
        { text: "Date", key: "date", sortable: true },
        {
            key: "action",
            text: "Action",
            cell: (record, index) => {
                return (
                    <div className="text-center">
                        <button
                            className="btn btn-secondary btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                                goToRecipe(record.id);
                            }}
                        >
                            Visit
                        </button>
                        <button
                            className="btn btn-danger btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => {
                                deleteEntry(record.favorite_id);
                            }}
                        >
                            Delete
                            <i
                                className="fa fa-trash"
                                style={{ paddingLeft: "5px" }}
                            ></i>
                        </button>
                    </div>
                );
            },
        },
    ];

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
                    favorite_id: res[i].favorite_id,
                    id: recipe.recipeData.recipe_id,
                    title: recipe.recipeData.title,
                    date: formattedDate,
                });

                const json = await (
                    await getAllRecipeLikes(recipe.recipeData.recipe_id)
                ).json();
                detailedRecipes[i].likes = json.length;
            }
            setFavouriteRecipes(detailedRecipes);
        });
    }, []);

    const goToRecipe = (id) => {
        history.push(`recipeview/${id}`);
    };

    const deleteEntry = (id) => {
        deleteUserFavoriteRecipe(id).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="favorite-recipes">
            <div className="recipes__header px-3 pt-3 pb-1">
                <h3>Favorite Recipes</h3>
            </div>
            <div className="recipes__table p-3">
                {favouriteRecipes.length > 0 ? (
                    <div>
                        <ReactDatatable
                            columns={columns}
                            records={favouriteRecipes}
                        />
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
