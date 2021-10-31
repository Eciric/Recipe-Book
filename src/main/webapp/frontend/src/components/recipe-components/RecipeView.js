import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { TextField } from "@material-ui/core";
import {
    addUserFavoriteRecipe,
    deleteUserFavoriteRecipe,
    getAllUserFavorites,
    getRecipeById,
} from "../../services/recipe-services/recipeService";
import { getUserData } from "../../services/user-services/userService";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import {
    getComments,
    addComment,
} from "../../services/user-services/commentsService";
import {
    addUserLikeToRecipe,
    deleteUserLikeFromRecipe,
    getAllRecipeLikes,
    getAllUserLikes,
} from "../../services/user-services/likeService";
import { CommentSection } from "../comment-components/CommentSection";
import likesImage from "../../images/like.png";
import heartImage from "../../images/heart.png";
import likesClickedImage from "../../images/likeClicked.png";
import heartClickedImage from "../../images/heartClicked.png";
import defaultImage from "../../images/user.png";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export const RecipeView = () => {
    // History for redirecting
    const history = useHistory();

    // Recipe hooks
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const [recipePicture, setRecipePicture] = useState("");
    const [favoriteRecipe, setFavoriteRecipe] = useState(false);
    const [processingFav, setProcessingFav] = useState(false);
    const [favoriteImage, setFavoriteImage] = useState("");
    const [favoriteRecipeMessage, setFavoriteRecipeMessage] = useState("");
    const [loadingFavorite, setLoadingFavorite] = useState(false);

    // Creator and User hooks
    const [creator, setCreator] = useState({});
    const [loadingCreator, setLoadingCreator] = useState(false);
    const [creatorPicture, setCreatorPicture] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [userImage, setUserImage] = useState("");

    // Comments hooks
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const [comment, setComment] = useState("");
    const [addingComment, setAddingComment] = useState(false);
    const [addCommentResponse, setAddCommentResponse] = useState("");
    const [addCommentSuccessful, setAddCommentSuccessful] = useState(false);
    const [reloadComments, setReloadComments] = useState(false);

    // Likes hooks
    const [recipeLikes, setRecipeLikes] = useState(0);
    const [loadingLikes, setLoadingLikes] = useState(false);
    const [processingLike, setProcessingLike] = useState(false);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [likePic, setLikePic] = useState(likesImage);
    const [likeId, setLikeId] = useState(undefined);

    // Fetch recipe related data
    useEffect(() => {
        setLoadingRecipe(true);
        getRecipeById(id)
            .then((res) => res.json())
            .then((json) => {
                setLoadingRecipe(false);
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
                setLoadingRecipe(false);
                console.log(err);
            });
    }, [id]);

    // Fetch logged in user data
    useEffect(() => {
        let userObject = JSON.parse(localStorage.getItem("user"));
        if (userObject) {
            setLoggedIn(true);
            let username = userObject.username;
            getUserData(username, null)
                .then((res) => {
                    setUser(res);
                    if (res.profile_picture) {
                        let blob = base64toBlob(
                            res.profile_picture,
                            "image/png"
                        );
                        const objectURL = URL.createObjectURL(blob);
                        setUserImage(objectURL);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []);

    // Fetching creator of the recipe data
    useEffect(() => {
        if (recipe.user_id) {
            setLoadingCreator(true);
            getUserData(null, recipe.user_id)
                .then((json) => {
                    setLoadingCreator(false);
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
                    setLoadingCreator(false);
                    console.log(err);
                });
        }
    }, [recipe]);

    // Sets the recipe count to be displayed in the view
    useEffect(() => {
        setLoadingLikes(true);
        getAllRecipeLikes(id)
            .then((res) => res.json())
            .then((json) => {
                setLoadingLikes(false);
                setRecipeLikes(json.length);
            })
            .catch((err) => {
                setLoadingLikes(false);
                console.log(err);
            });
    }, [id, alreadyLiked]);

    // Checks if the user already likes this recipe
    useEffect(() => {
        let userObject = JSON.parse(localStorage.getItem("user"));
        if (userObject) {
            let user_id = userObject.id;
            getAllUserLikes(user_id)
                .then((res) => res.json())
                .then((json) => {
                    let result = json.find(
                        (row) => row.recipe_id === Number(id)
                    );
                    if (result) {
                        setLikeId(result.like_id);
                        setLikePic(likesClickedImage);
                        setAlreadyLiked(true);
                    } else {
                        setLikePic(likesImage);
                        setAlreadyLiked(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id, processingLike]);

    //Checks if user already favourites this recipe
    useEffect(() => {
        setLoadingFavorite(true);
        let userObject = JSON.parse(localStorage.getItem("user"));
        if (userObject) {
            let user_id = userObject.id;
            getAllUserFavorites(user_id)
                .then((json) => {
                    setLoadingFavorite(false);
                    let result = json.find(
                        (row) => row.recipe_id === Number(id)
                    );
                    if (result) {
                        setFavoriteRecipe(result);
                        setFavoriteImage(heartClickedImage);
                        setFavoriteRecipeMessage("Remove from favorites");
                    } else {
                        setFavoriteImage(heartImage);
                        setFavoriteRecipeMessage("Add to favorites");
                    }
                })
                .catch((err) => {
                    setLoadingFavorite(false);
                    console.log(err);
                });
        }
    }, [id, processingFav]);

    const getParsedComments = async (json) => {
        let newComments = [];
        for (let i = 0; i < json.length; i++) {
            const user = await getUserData(null, json[i].user_id);
            let image = base64toBlob(user.profile_picture, "image/png");
            const objectURL = URL.createObjectURL(image);
            newComments.push({
                id: json[i].comment_id,
                username: user.username,
                message: json[i].message,
                date: json[i].date_created,
                image: objectURL,
            });
        }
        return newComments;
    };

    // Fetches recipe comments
    useEffect(() => {
        setReloadComments(false);
        setLoadingComments(true);
        getComments(Number(id))
            .then((res) => res.json())
            .then(async (json) => {
                let parsedComments = await getParsedComments(json);
                setComments(parsedComments);
                setLoadingComments(false);
            })
            .catch((err) => {
                setLoadingComments(false);
                console.log(err);
            });
    }, [id, addingComment, reloadComments]);

    const handleLikeClicked = () => {
        if (!loggedIn) {
            history.push("/login");
            return;
        }

        if (processingLike === false) {
            setProcessingLike(true);
            let user_id = JSON.parse(localStorage.getItem("user")).id;
            if (alreadyLiked) {
                // Delete user like and change the image accordingly
                deleteUserLikeFromRecipe(likeId)
                    .then((res) => {
                        if (res.ok) {
                            setProcessingLike(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setProcessingLike(false);
                    });
            } else {
                // Add user like and change the image accordingly
                addUserLikeToRecipe(user_id, id)
                    .then((res) => {
                        if (res.ok) {
                            setProcessingLike(false);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setProcessingLike(false);
                    });
            }
        }
    };

    const handleFavClicked = () => {
        if (!loggedIn) {
            history.push("/login");
            return;
        }

        if (processingFav === false) {
            setProcessingFav(true);
            let user_id = JSON.parse(localStorage.getItem("user")).id;
            console.log(user_id);
            if (favoriteRecipe) {
                deleteUserFavoriteRecipe(favoriteRecipe.favorite_id).finally(
                    () => {
                        setProcessingFav(false);
                    }
                );
            } else {
                addUserFavoriteRecipe(user_id, id).finally(() => {
                    setProcessingFav(false);
                });
            }
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSubmitComment = () => {
        setAddingComment(true);
        addComment(id, user.user_id, comment)
            .then((res) => {
                if (res.ok) {
                    setComment("");
                    setAddingComment(false);
                    setAddCommentSuccessful(true);
                    setAddCommentResponse(
                        "Sucessfully submitted your message!"
                    );
                    setTimeout(async () => {
                        setAddCommentResponse("");
                    }, 1500);
                }
            })
            .catch((err) => {
                console.log(err);
                setAddingComment(false);
                setAddCommentSuccessful(false);
                setAddCommentResponse("Failed to submit your message!");
                setTimeout(async () => {
                    setAddCommentResponse("");
                }, 1500);
            });
    };

    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">
                    {loadingRecipe ? (
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
                        <h1 className="display-4">{recipe.title}</h1>
                    )}
                </div>
                <div className="card-body">
                    <div className="row p-2 mt-4">
                        <div className="col-4">
                            {loadingCreator ? (
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
                                <div className="userInfo ">
                                    <Link to={`/profile/${creator.username}`}>
                                        <img
                                            id="recipeUserPicture"
                                            src={creatorPicture}
                                            alt=""
                                            className="img-fluid"
                                        />
                                    </Link>
                                    <p className="mt-2">
                                        By{" "}
                                        <Link
                                            id="creatorName"
                                            to={`/profile/${creator.username}`}
                                        >
                                            {creator.username}
                                        </Link>
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="col-4">
                            {loadingLikes ? (
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
                                <div className="recipeLikes">
                                    <img
                                        id="likesImage"
                                        src={likePic}
                                        onClick={handleLikeClicked}
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <p className="mt-2">
                                        Total likes: {recipeLikes}
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="col-4">
                            {loadingFavorite ? (
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
                                <div className="recipe-favorite">
                                    <img
                                        id="favoriteImage"
                                        src={favoriteImage}
                                        onClick={handleFavClicked}
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <p className="mt-2">
                                        {favoriteRecipeMessage}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <hr className="my-1" style={{ color: "#683ed1" }}></hr>
                    <div className="recipeInfo">
                        {loadingRecipe ? (
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
                            <div>
                                <p
                                    className="mt-3"
                                    style={{ color: "#683ed1" }}
                                >
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
                                <Tabs className="mt-5 mb-2">
                                    <TabList>
                                        <Tab>Instructions</Tab>
                                        <Tab>Ingredients</Tab>
                                        <Tab>Comments</Tab>
                                    </TabList>
                                    <TabPanel>
                                        <div className="my-5 recipeContents">
                                            <h1
                                                className="display-5 mb-5"
                                                style={{ color: "#683ed1" }}
                                            >
                                                Recipe instructions
                                            </h1>
                                            {recipe.contents}
                                        </div>
                                    </TabPanel>
                                    <TabPanel>
                                        <h1 className="display-5">
                                            Ingredients
                                        </h1>
                                    </TabPanel>
                                    <TabPanel>
                                        {loadingComments ? (
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
                                            <div className="my-5 recipeComments">
                                                <div className="commentsCount">
                                                    <p>
                                                        {comments.length}{" "}
                                                        Comments
                                                    </p>
                                                </div>
                                                {loggedIn ? (
                                                    <div className="container createComment">
                                                        <div className="image">
                                                            <img
                                                                id="recipeUserPicture"
                                                                alt=""
                                                                src={userImage}
                                                            />
                                                        </div>
                                                        <div className="text">
                                                            <TextField
                                                                id="standard-basic"
                                                                className="recipeComment"
                                                                multiline={true}
                                                                label="Add a comment..."
                                                                value={comment}
                                                                onChange={
                                                                    handleCommentChange
                                                                }
                                                            />
                                                            <button
                                                                className="btn btn-submit mt-3"
                                                                onClick={
                                                                    handleSubmitComment
                                                                }
                                                                disabled={
                                                                    addingComment
                                                                }
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="container loginPrompt">
                                                        <p>
                                                            <Link to="/login">
                                                                Log in
                                                            </Link>{" "}
                                                            to create a comment!
                                                        </p>
                                                    </div>
                                                )}
                                                {addCommentResponse.length >
                                                    0 &&
                                                    (addCommentSuccessful ? (
                                                        <div
                                                            className="alert alert-success my-3"
                                                            role="alert"
                                                        >
                                                            <p>
                                                                {
                                                                    addCommentResponse
                                                                }
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="alert alert-danger my-3"
                                                            role="alert"
                                                        >
                                                            <p>
                                                                {
                                                                    addCommentResponse
                                                                }
                                                            </p>
                                                        </div>
                                                    ))}
                                                {loadingComments ? (
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
                                                    <CommentSection
                                                        comments={comments}
                                                        userImage={userImage}
                                                        setReloadComments={
                                                            setReloadComments
                                                        }
                                                    />
                                                )}
                                            </div>
                                        )}
                                    </TabPanel>
                                </Tabs>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
