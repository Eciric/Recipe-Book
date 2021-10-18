import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { TextField } from "@material-ui/core";
import { getRecipeById } from "../../services/recipe-services/recipeService";
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
import likesClickedImage from "../../images/likeClicked.png";
import defaultImage from "../../images/user.png";

export const RecipeView = () => {
    // History for redirecting
    const history = useHistory();

    // Recipe hooks
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [loadingRecipe, setLoadingRecipe] = useState(false);
    const [recipePicture, setRecipePicture] = useState("");

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
                    if (result) setLikeId(result.like_id);
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
        }
    }, [id, processingLike]);

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
                    <div className="row">
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
                            <div className="userInfo col-sm-12 col-lg-6 col-xl-6">
                                <Link to={`/profile/${creator.username}`}>
                                    <img
                                        id="recipeUserPicture"
                                        src={creatorPicture}
                                        alt=""
                                        className="img-fluid mt-4"
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
                        )}
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
                                <hr className="mt-5"></hr>
                                <div className="my-5 recipeContents">
                                    <h1
                                        className="display-5 mb-5"
                                        style={{ color: "#683ed1" }}
                                    >
                                        Recipe instructions
                                    </h1>
                                    {recipe.contents}
                                </div>
                            </div>
                        )}
                        <hr className="mt-5"></hr>
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
                                    <p>{comments.length} Comments</p>
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
                                                onChange={handleCommentChange}
                                            />
                                            <button
                                                className="btn btn-submit mt-3"
                                                onClick={handleSubmitComment}
                                                disabled={addingComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="container loginPrompt">
                                        <p>
                                            <Link to="/login">Log in</Link> to
                                            create a comment!
                                        </p>
                                    </div>
                                )}
                                {addCommentResponse.length > 0 &&
                                    (addCommentSuccessful ? (
                                        <div
                                            className="alert alert-success my-3"
                                            role="alert"
                                        >
                                            <p>{addCommentResponse}</p>
                                        </div>
                                    ) : (
                                        <div
                                            className="alert alert-danger my-3"
                                            role="alert"
                                        >
                                            <p>{addCommentResponse}</p>
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
                                        setReloadComments={setReloadComments}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
