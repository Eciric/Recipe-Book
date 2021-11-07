import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "react-loader-spinner";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import { uploadProfilePicture } from "../../services/file-services/fileService";
import { getAllUserRecipes } from "../../services/recipe-services/recipeService";
import { getUserData } from "../../services/user-services/userService";
import { getUserRecipeLikesCount } from "../../services/user-services/likeService";
import { SearchBar } from "../shared-components/SearchBar";
import { Pagination } from "../shared-components/Pagination";
import { NoRecipes } from "../recipe-components/NoRecipes";
import { RecipeList } from "../recipe-components/RecipeList";
import defaultImage from "../../images/user.png";

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [otherUser, setOtherUser] = useState(true);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingRecipes, setLoadingRecipes] = useState(false);
    const [profileUri, setProfileUri] = useState(defaultImage);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(6);
    const [userRecipes, setUserRecipes] = useState([]);
    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [likesCount, setLikesCount] = useState(0);
    const [editing, setEditing] = useState(false);
    const [userObject, setUserObject] = useState({});
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRepeatPassword, setNewRepeatPassword] = useState("");
    const { username } = useParams();
    const inputFile = useRef(null);
    const onButtonClick = () => {
        inputFile.current.click();
    };

    useEffect(() => {
        setLoadingProfile(true);
        getUserData(username, null)
            .then((res) => {
                const user = JSON.parse(localStorage.getItem("user"));
                if (user) {
                    if (res.user_id === user.id) setOtherUser(false);
                }
                if (res.profile_picture) {
                    let blob = base64toBlob(res.profile_picture, "image/png");
                    const objectURL = URL.createObjectURL(blob);
                    setProfileUri(objectURL);
                } else {
                    setProfileUri(defaultImage);
                }
                console.log(res);
                setUserObject(res);
                setLoadingProfile(false);

                setUserRecipes([]);
                setLoadingRecipes(true);
                getAllUserRecipes(res.user_id)
                    .then((res) => res.json())
                    .then((json) => {
                        const recipes = json.recipes;
                        let newRecipes = [];
                        recipes.forEach((recipe) => {
                            newRecipes.push({
                                id: recipe.recipeData.recipe_id,
                                user_id: recipe.recipeData.user_id,
                                title: recipe.recipeData.title,
                                date: recipe.recipeData.date_created,
                                img: URL.createObjectURL(
                                    base64toBlob(recipe.image, "image/png")
                                ),
                            });
                        });
                        setLoadingRecipes(false);
                        setUserRecipes(newRecipes);
                        setDisplayRecipes(newRecipes);
                    })
                    .catch((err) => {
                        setLoadingRecipes(false);
                        console.log(err);
                    });
                getUserRecipeLikesCount(res.user_id)
                    .then((res) => {
                        return res.json();
                    })
                    .then((json) => {
                        setLikesCount(json);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
                setLoadingProfile(false);
            });
    }, [username]);

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

    const updateSearch = (filteredRecipes) => {
        setCurrentPage(1);
        setDisplayRecipes(filteredRecipes);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = displayRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    const handleEdit = () => {};

    return (
        <div>
            {editing ? (
                <div id="edit-profile" className="container my-5 ">
                    <div className="edit-profile__return ps-4 pt-4">
                        <button
                            className="btn"
                            style={{ color: "#683ed1" }}
                            onClick={() => {
                                setEditing(false);
                            }}
                        >
                            <i className="bi bi-arrow-left me-2"></i>
                            Cancel editing
                        </button>
                    </div>

                    <form onSubmit={handleEdit} className="text-center">
                        <div className="user-data form-group px-5 pt-2 pb-4">
                            <label className="my-2">Username</label>
                            <input
                                type="text"
                                className="form-control auth-control"
                                placeholder={userObject.username}
                                autoComplete="off"
                                id="inputUsername"
                                onChange={(e) => {
                                    setNewUsername(e.target.value);
                                }}
                                value={newUsername}
                            />
                            <hr className="my-4" />
                            <label className="my-2">Email</label>
                            <input
                                type="text"
                                className="form-control auth-control"
                                placeholder={userObject.email}
                                autoComplete="off"
                                id="inputEmail"
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                }}
                                value={newEmail}
                            />
                            <hr className="my-4" />

                            <label className="my-2">Password</label>
                            <input
                                type="password"
                                className="form-control auth-control"
                                placeholder="**********"
                                autoComplete="off"
                                id="inputPassword"
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                }}
                                value={newPassword}
                            />

                            <label className="my-2 mt-4">Repeat password</label>
                            <input
                                type="password"
                                className="form-control auth-control"
                                placeholder="**********"
                                autoComplete="off"
                                id="inputPassword"
                                onChange={(e) => {
                                    setNewRepeatPassword(e.target.value);
                                }}
                                value={newRepeatPassword}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary my-3">
                            Edit!
                        </button>
                    </form>
                </div>
            ) : (
                <div id="profileContainer" className="container my-5">
                    {!otherUser && (
                        <div className="editProfile">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    setEditing(true);
                                }}
                            >
                                Edit profile <i className="bi bi-pen ms-2"></i>
                            </button>
                        </div>
                    )}
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
                                {!otherUser && (
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
                                                    style={{
                                                        display: "none",
                                                    }}
                                                />
                                            </i>
                                        </span>
                                    </div>
                                )}

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
                        Recipes shared: {userRecipes.length}
                        <br></br>
                        All recipe likes: {likesCount}
                    </p>

                    <hr className="my-5"></hr>
                    <div className="container ">
                        {!otherUser ? (
                            <h1
                                className="display-4 text-center my-5"
                                style={{ color: "#683ed1" }}
                            >
                                My recipes
                            </h1>
                        ) : (
                            <h1
                                className="display-4 text-center my-5"
                                style={{ color: "#683ed1" }}
                            >
                                {username + "'s"} recipes
                            </h1>
                        )}

                        {!otherUser ? (
                            <SearchBar
                                text="Search through your recipes!"
                                recipes={userRecipes}
                                callback={updateSearch}
                            />
                        ) : (
                            <SearchBar
                                text={`Search through ${username}'s recipes!`}
                                recipes={userRecipes}
                                callback={updateSearch}
                            />
                        )}

                        <RecipeList
                            loading={loadingRecipes}
                            recipes={currentRecipes}
                            noRecipesComponent={<NoRecipes />}
                        />
                        <Pagination
                            recipesPerPage={recipesPerPage}
                            totalRecipes={displayRecipes.length}
                            callback={paginate}
                        />
                    </div>

                    <br></br>
                </div>
            )}
        </div>
    );
};

export default Profile;
