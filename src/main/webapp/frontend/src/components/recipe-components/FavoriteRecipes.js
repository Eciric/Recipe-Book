import React, { useState } from "react";
import { Link } from "react-router-dom";

export const FavoriteRecipes = () => {
    const [favouriteRecipes, setFavouriteRecipes] = useState([]);

    return (
        <div className="favorite-recipes m-5">
            <div className="recipes__header px-3 pt-3 pb-1">
                <h3>Favorite Recipes</h3>
            </div>
            <div className="recipes__table p-3">
                {favouriteRecipes.length > 0 ? (
                    <div></div>
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
