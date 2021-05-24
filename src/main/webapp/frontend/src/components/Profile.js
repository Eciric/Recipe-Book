import defaultImage from "../images/user.png";
import { base64toBlob } from "../services/base64ToBlob";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
    downloadProfilePicture,
    uploadProfilePicture,
} from "../services/fileService";
import { getAllUserRecipes } from "../services/recipeService";
import Loader from "react-loader-spinner";
import { RecipeList } from "./RecipeList";
import { NoRecipes } from "./NoRecipes";

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingRecipes, setLoadingRecipes] = useState(false);
    const [profileUri, setProfileUri] = useState(defaultImage);
    const [userRecipes, setUserRecipes] = useState([]);
    const { username } = useParams();
    const inputFile = useRef(null);
    const onButtonClick = () => {
        inputFile.current.click();
    };

    useEffect(() => {
        setLoadingProfile(true);
        downloadProfilePicture()
            .then((res) => {
                if (res.status === 200) {
                    let blob = base64toBlob(res.data.bytes, "image/png");
                    const objectURL = URL.createObjectURL(blob);
                    setProfileUri(objectURL);
                } else {
                    setProfileUri(defaultImage);
                }
                setLoadingProfile(false);
            })
            .catch((err) => {
                setErrorMessage(err);
                setLoadingProfile(false);
            });
    }, []);

    useEffect(() => {
        // setLoadingRecipes(true);
        const user = JSON.parse(localStorage.getItem("user"));
        setUserRecipes([]);
        setLoadingRecipes(true);
        let id = user.id;
        getAllUserRecipes(id)
            .then((res) => res.json())
            .then((json) => {
                const recipes = json.recipes;
                let newRecipes = [];
                recipes.forEach((recipe) => {
                    newRecipes.push({
                        id: recipe.recipeData.recipe_id,
                        user_id: recipe.recipeData.user_id,
                        title: recipe.recipeData.title,
                        likes: recipe.recipeData.likes,
                        date: recipe.recipeData.date_created,
                        img: URL.createObjectURL(
                            base64toBlob(recipe.image, "image/png")
                        ),
                    });
                });
                setLoadingRecipes(false);
                setUserRecipes(newRecipes);
            })
            .catch((err) => {
                setLoadingRecipes(false);
                console.log(err);
            });
    }, []);

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        if (file) {
            setLoadingProfile(true);
            uploadProfilePicture(file)
                .then((res) => {
                    if (res.ok) {
                        const reader = new FileReader();
                        reader.addEventListener(
                            "load",
                            function () {
                                setProfileUri(reader.result);
                                setLoadingProfile(false);
                            },
                            false
                        );

                        if (file) {
                            reader.readAsDataURL(file);
                        }
                    }
                })
                .catch((err) => {
                    setErrorMessage(err);
                    setLoadingProfile(false);
                });
        }
    };

    return (
        <div id="profileContainer" className="container my-5">
            <div className="profilePictureContainer ">
                {loadingProfile ? (
                    <Loader
                        type="ThreeDots"
                        color="#683ED1"
                        height="100"
                        width="100"
                    />
                ) : (
                    <div>
                        <img
                            id="profilePicture"
                            src={profileUri}
                            alt=""
                            className="img-fluid my-4"
                        />
                        <div className="addProfilePictureContainer">
                            <span className="fa-stack">
                                <i
                                    id="backgroundIcon"
                                    className="fa fa-circle fa-stack-1x"
                                ></i>
                                <i
                                    id="addProfilePictureIcon"
                                    className="fa fa-plus-circle fa-stack-1x"
                                    onClick={onButtonClick}
                                >
                                    <input
                                        type="file"
                                        id="file"
                                        ref={inputFile}
                                        onChange={onFileChange}
                                        style={{ display: "none" }}
                                    />
                                </i>
                            </span>
                        </div>
                        {errorMessage.length > 0 && (
                            <div
                                className="alert alert-danger my-3"
                                role="alert"
                            >
                                <p>{errorMessage}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <h1 className="display-4" style={{ color: "#683ed1" }}>
                {username}
            </h1>
            <p>
                Recipes shared: {0}
                <br></br>
                All recipe likes: {0}
            </p>

            <hr className="my-5"></hr>
            <div className="container ">
                <h1
                    className="display-4 text-center my-5"
                    style={{ color: "#683ed1" }}
                >
                    My recipes
                </h1>
                <RecipeList
                    loading={loadingRecipes}
                    recipes={userRecipes}
                    noRecipesComponent={<NoRecipes />}
                />
            </div>

            <br></br>
        </div>
    );
};

export default Profile;
