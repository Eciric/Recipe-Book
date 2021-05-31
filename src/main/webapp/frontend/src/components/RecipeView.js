import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getUserData } from "../services/userService";
import { base64toBlob } from "../services/base64ToBlob";
import defaultImage from "../images/user.png";

export const RecipeView = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState({});
    const [creator, setCreator] = useState({});
    const [creatorPicture, setCreatorPicture] = useState("");
    const [recipePicture, setRecipePicture] = useState("");

    useEffect(() => {
        // Fetch recipe related data
        setLoading(true);
        getRecipeById(id)
            .then((res) => res.json())
            .then((json) => {
                setLoading(false);
                var recipe = json.recipes[0];
                setRecipe({
                    id: recipe.recipeData.recipe_id,
                    title: recipe.recipeData.title,
                    likes: recipe.recipeData.likes,
                    img: recipe.image,
                    contents: recipe.recipeData.recipe_text,
                    date: recipe.recipeData.date_created,
                    user_id: recipe.recipeData.user_id,
                });
                if (recipe.image) {
                    let blob = base64toBlob(recipe.image, "image/png");
                    const objectURL = URL.createObjectURL(blob);
                    setRecipePicture(objectURL);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        if (recipe.user_id) {
            setLoading(true);
            getUserData(null, recipe.user_id)
                .then((json) => {
                    setLoading(false);
                    setCreator(json);
                    if (json.profile_picture) {
                        let blob = base64toBlob(
                            json.profile_picture,
                            "image/png"
                        );
                        const objectURL = URL.createObjectURL(blob);
                        setCreatorPicture(objectURL);
                    } else {
                        setCreatorPicture(defaultImage);
                    }
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
    }, [recipe]);

    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">
                    <h1 className="display-4">{recipe.title}</h1>
                </div>
                <div className="card-body">
                    <div className="userInfo">
                        <img
                            id="recipeUserPicture"
                            src={creatorPicture}
                            alt=""
                            className="img-fluid mt-4"
                        />
                        <p className="mt-2">
                            By{" "}
                            <a href={`/profile/${creator.username}`}>
                                {creator.username}
                            </a>
                        </p>
                    </div>
                    <hr className="my-1" style={{ color: "#683ed1" }}></hr>
                    <div className="recipeInfo">
                        <p className="mt-3" style={{ color: "#683ed1" }}>
                            Recipe created:{" "}
                            {new Date(recipe.date).toLocaleDateString("en-gb", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                        <img
                            id="recipeImage"
                            src={recipePicture}
                            alt=""
                            className="img-fluid"
                        />
                        <hr className="mt-5"></hr>
                        <div className="my-5">
                            <h1
                                className="display-5 mb-5"
                                style={{ color: "#683ed1" }}
                            >
                                Recipe instructions
                            </h1>
                            {recipe.contents}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
