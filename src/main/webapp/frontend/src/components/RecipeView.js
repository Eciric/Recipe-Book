import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";
import { getUserData } from "../services/userService";
import { base64toBlob } from "../services/base64ToBlob";
import {
    addUserLikeToRecipe,
    deleteUserLikeFromRecipe,
    getAllRecipeLikes,
    getAllUserLikes,
} from "../services/likeService";
import likesImage from "../images/like.png";
import likesClickedImage from "../images/likeClicked.png";
import defaultImage from "../images/user.png";
import Loader from "react-loader-spinner";

export const RecipeView = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [recipe, setRecipe] = useState({});
    const [creator, setCreator] = useState({});
    const [creatorPicture, setCreatorPicture] = useState("");
    const [recipePicture, setRecipePicture] = useState("");
    const [likePic, setLikePic] = useState(likesImage);
    const [processing, setProcessing] = useState(false);
    const [recipeLikes, setRecipeLikes] = useState(0);
    const [alreadyLiked, setAlreadyLiked] = useState(false);

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

    // Sets the recipe count to be displayed in the view
    useEffect(() => {
        getAllRecipeLikes(id)
            .then((res) => res.json())
            .then((json) => {
                setRecipeLikes(json.length);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, alreadyLiked]);

    // Checks if the user already likes this recipe
    useEffect(() => {
        let user_id = JSON.parse(localStorage.getItem("user")).id;
        getAllUserLikes(user_id)
            .then((res) => res.json())
            .then((json) => {
                let result = json.find((row) => row.recipe_id === Number(id));
                if (result === undefined) result = false;
                else result = true;

                setAlreadyLiked(result);

                if (result === true) {
                    setLikePic(likesClickedImage);
                } else {
                    setLikePic(likesImage);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleLikeClicked = () => {
        if (processing === false) {
            setProcessing(true);
            let user_id = JSON.parse(localStorage.getItem("user")).id;
            if (alreadyLiked) {
                // Delete user like and change the image accordingly
                deleteUserLikeFromRecipe(user_id, id)
                    .then((res) => {
                        if (res.ok) {
                            setAlreadyLiked(false);
                            setLikePic(likesImage);
                            setProcessing(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setProcessing(false);
                    });
            } else {
                // Add user like and change the image accordingly
                addUserLikeToRecipe(user_id, id)
                    .then((res) => {
                        if (res.ok) {
                            setAlreadyLiked(true);
                            setLikePic(likesClickedImage);
                            setProcessing(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setProcessing(false);
                    });
            }
        }
    };

    return (
        <div className="container">
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
            ) : (
                <div className="card my-5 text-center">
                    <div className="card-header">
                        <h1 className="display-4">{recipe.title}</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="userInfo col-sm-12 col-lg-6 col-xl-6">
                                <img
                                    id="recipeUserPicture"
                                    src={creatorPicture}
                                    alt=""
                                    className="img-fluid mt-4"
                                />
                                <p className="mt-2">
                                    By{" "}
                                    <a
                                        id="creatorName"
                                        href={`/profile/${creator.username}`}
                                    >
                                        {creator.username}
                                    </a>
                                </p>
                            </div>
                            <div className="recipeLikes col-sm-12 col-lg-6 col-xl-6">
                                <img
                                    id="likesImage"
                                    src={likePic}
                                    onClick={handleLikeClicked}
                                    alt=""
                                    className="img-fluid mt-4"
                                />
                                <p className="mt-2">
                                    Total likes: {recipeLikes}
                                </p>
                            </div>
                        </div>
                        <hr className="my-1" style={{ color: "#683ed1" }}></hr>
                        <div className="recipeInfo">
                            <p className="mt-3" style={{ color: "#683ed1" }}>
                                Recipe created:{" "}
                                {new Date(recipe.date).toLocaleDateString(
                                    "en-gb",
                                    {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    }
                                )}
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
            )}
        </div>
    );
};
