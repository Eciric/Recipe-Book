import React from "react";
import RecipeTile from "./RecipeTile";
import Loader from "react-loader-spinner";

export const RecipeList = ({ loading, recipes, noRecipesComponent }) => {
    return (
        <section className="recipeList">
            {loading ? (
                <div className="spinnerContainer">
                    <Loader
                        type="MutatingDots"
                        color="#683ED1"
                        secondaryColor="#9b6dff"
                        height={100}
                        width={100}
                    />
                </div>
            ) : recipes.length ? (
                <div className="row justify-content-around">
                    {recipes.map((recipe) => {
                        return (
                            <RecipeTile
                                title={recipe.title}
                                img={recipe.img}
                                id={recipe.id}
                                key={recipe.id}
                            />
                        );
                    })}
                </div>
            ) : (
                noRecipesComponent
            )}
        </section>
    );
};
