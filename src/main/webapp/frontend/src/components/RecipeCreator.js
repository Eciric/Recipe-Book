import { useRef, useState, useEffect } from "react";
import { storeRecipe } from "../services/recipeService";
import { useHistory } from "react-router-dom";
import { isLoggedIn } from "../services/authService";

const validateName = (name) => {
    return name.length > 2 && name.length < 25;
};

const validateContents = (contents) => {
    return contents.length > 10 && contents.length < 1501;
};

const RecipeCreator = () => {
    const history = useHistory();
    // Hooks for data setting
    const [name, setName] = useState("");
    const [contents, setContents] = useState("");
    const [image, setImage] = useState();
    const [recipeUri, setRecipeUri] = useState();
    const inputFile = useRef(null);

    // Hooks for error handling
    const [nameError, setNameError] = useState("");
    const [contentsError, setContentsError] = useState("");

    // Hooks for api communication
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!isLoggedIn()) {
            history.push("/login");
            window.location.reload();
        }
    }, [history]);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        setRecipeUri(URL.createObjectURL(file));
        setImage(file);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (e.target.value) {
            setNameError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!validateName(e.target.value)) {
            setNameError("Recipe's title must be between 2 and 15 characters!");
            e.target.style.border = "2px solid red";
        }

        if (!e.target.value) {
            setNameError("Recipe's title can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handleContentsChange = (e) => {
        setContents(e.target.value);
        if (e.target.value) {
            setContentsError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!validateContents(e.target.value)) {
            setContentsError(
                "Contents must be between 10 and 1500 characters!"
            );
            e.target.style.border = "2px solid red";
        }

        if (!e.target.value) {
            setContentsError("Contents can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handleRecipeSubmit = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if (name === "" || contents === "" || image === undefined) {
            setSuccessful(false);
            setMessage("Fill out the form properly!");
        } else {
            setLoading(true);
            storeRecipe(name, contents, image)
                .then((res) => {
                    setSuccessful(true);
                    setLoading(false);
                    setMessage("Successfully added the recipe!");
                    setTimeout(() => {
                        history.push("/");
                        window.location.reload();
                    }, 500);
                })
                .catch((err) => {
                    setSuccessful(false);
                    setLoading(false);
                    setMessage(err);
                });
        }
    };

    return (
        <div className="recipeCreator container my-5">
            <div className="card-header py-2">
                <h1
                    className="display-4 text-center"
                    style={{ color: "#683ed1" }}
                >
                    Recipe Creator!
                </h1>
            </div>

            <div className="recipeForm p-5">
                <div className="form-group my-4">
                    <label className="my-1">Recipe Name:</label>
                    <input
                        id="recipeName"
                        type="text"
                        className="form-control"
                        onChange={handleNameChange}
                        value={name}
                    ></input>
                    {nameError.length > 0 && (
                        <span className="error">{nameError}</span>
                    )}
                </div>

                <div className="form-group my-4">
                    <label>Recipe Image:</label>
                    <div className="recipePictureContainer">
                        <img
                            id="recipePicture"
                            src={recipeUri}
                            alt=""
                            className="img-fluid my-4"
                        />
                        <div className="addRecipePictureContainer">
                            <span className="fa-stack">
                                <i
                                    id="recipeBackgroundIcon"
                                    className="fa fa-circle fa-stack-1x"
                                ></i>
                                <i
                                    id="addRecipePictureIcon"
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
                    </div>
                </div>

                <div className="form-group my-4">
                    <label className="my-1">Recipe Contents:</label>
                    <textarea
                        id="recipeContent"
                        className="form-control"
                        rows="10"
                        onChange={handleContentsChange}
                        value={contents}
                    ></textarea>
                    {contentsError.length > 0 && (
                        <span className="error">{contentsError}</span>
                    )}
                </div>

                <div className="my-4">
                    <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={handleRecipeSubmit}
                        disabled={loading}
                    >
                        Submit your recipe!
                    </button>
                </div>

                {message.length > 0 &&
                    (successful ? (
                        <div className="alert alert-success my-3" role="alert">
                            <p>{message}</p>
                        </div>
                    ) : (
                        <div className="alert alert-danger my-3" role="alert">
                            <p>{message}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default RecipeCreator;
