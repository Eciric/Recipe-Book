import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { storeRecipe } from "../../services/recipe-services/recipeService";
import { storeRecipeIngredients } from "../../services/recipe-services/ingredientsService";
import { storeRecipeTags } from "../../services/recipe-services/tagsService";
import {
    getCurrentUser,
    isLoggedIn,
} from "../../services/auth-services/authService";
import { Tags } from "../shared-components/Tags";
import Dropzone from "react-dropzone";
import uploadimg from "../../images/uploadicon.png";

const validateName = (name) => {
    return name.length > 2 && name.length < 25;
};

const validateContents = (contents) => {
    return contents.length > 10 && contents.length < 1501;
};

const MAX_FILES = 10;

const RecipeCreator = () => {
    const history = useHistory();
    // Hooks for data setting
    const [name, setName] = useState("");
    const [contents, setContents] = useState("");
    const [files, setFiles] = useState([]);

    // Hooks for error handling
    const [nameError, setNameError] = useState("");
    const [contentsError, setContentsError] = useState("");

    // Hooks for api communication
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    // Hooks for tags and ingredients
    const [tags, setTags] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        if (!isLoggedIn()) {
            history.push("/login");
        }
    }, [history]);

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

        if (name === "" || contents === "" || !files.length) {
            setSuccessful(false);
            setMessage("Fill out the form properly!");
        } else {
            setLoading(true);
            storeRecipe(name, contents, files)
                .then((res) => {
                    storeRecipeTags(
                        getCurrentUser()?.id,
                        res.recipe_id,
                        tags.map((tag) => tag.text)
                    );
                    storeRecipeIngredients(
                        getCurrentUser()?.id,
                        res.recipe_id,
                        ingredients.map((ingredient) => ingredient.text)
                    );
                    setSuccessful(true);
                    setLoading(false);
                    setMessage("Successfully added the recipe!");
                    setTimeout(() => {
                        history.push("/");
                    }, 500);
                })
                .catch((err) => {
                    setSuccessful(false);
                    setLoading(false);
                    setMessage(err);
                });
        }
    };

    const handleFileUpload = (acceptedFiles) => {
        if (files.length + acceptedFiles.length < MAX_FILES) {
            setFiles([...files, ...acceptedFiles]);
        }
    };

    const deleteFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
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

            <div className="recipeForm p-2">
                <div className="form-group my-4">
                    <div className="row">
                        <div className="col-md-12 col-xxl-6 p-3">
                            <label className="my-1">Recipe Name:</label>
                            <p className="lead mb-2">
                                How is your recipe called?
                            </p>
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

                            <label className="mt-3">Recipe Ingredients:</label>
                            <p className="lead mb-2">
                                Adding recipe ingredients will help users to
                                find your recipe through filter options and make
                                it easier to prepare for making it!
                            </p>
                            <Tags
                                tags={ingredients}
                                setTags={setIngredients}
                                suggestions={[]}
                            ></Tags>

                            <label className="mt-3">Recipe Tags:</label>
                            <p className="lead mb-2">
                                Make sure to add tags to your recipe to make it
                                easier to locate!
                            </p>
                            <Tags
                                tags={tags}
                                setTags={setTags}
                                suggestions={[]}
                            ></Tags>
                        </div>
                        <div className="col-md-12 col-xxl-6 p-3">
                            <label>Add recipe images</label>
                            <Dropzone
                                accept="image/png, image/jpeg"
                                maxFiles={MAX_FILES}
                                onDrop={handleFileUpload}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section className="dropzone-section">
                                        {files.length > 0 && (
                                            <div className="files-list">
                                                {files.map((file, index) => {
                                                    const reader =
                                                        new FileReader();
                                                    reader.onload =
                                                        function () {
                                                            if (!file.image) {
                                                                file.image =
                                                                    reader.result;
                                                                files.splice(
                                                                    index,
                                                                    1
                                                                );
                                                                files.splice(
                                                                    index,
                                                                    0,
                                                                    file
                                                                );
                                                                setFiles([
                                                                    ...files,
                                                                ]);
                                                            }
                                                        };
                                                    reader.readAsDataURL(file);
                                                    const fileName = file.name;
                                                    const fileSize = file.size;
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="files-list__item row"
                                                        >
                                                            <div className="col-3">
                                                                <img
                                                                    src={
                                                                        file.image
                                                                    }
                                                                    alt=""
                                                                    style={{
                                                                        width: "100px",
                                                                    }}
                                                                />
                                                            </div>
                                                            <div className="col-3">
                                                                {fileName}
                                                            </div>
                                                            <div className="col-3">
                                                                {fileSize}
                                                            </div>
                                                            <div className="col-3">
                                                                <button
                                                                    onClick={() => {
                                                                        deleteFile(
                                                                            index
                                                                        );
                                                                    }}
                                                                    className="btn btn-danger"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        <div
                                            className="dropzone-uploader"
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} />

                                            <div className="p-2">
                                                <img
                                                    className="img-fluid pb-2"
                                                    style={{
                                                        width: "150px",
                                                    }}
                                                    src={uploadimg}
                                                    alt="Upload file"
                                                />
                                                <p>
                                                    Drop files in the box or
                                                    click on it to open the file
                                                    explorer.
                                                </p>
                                            </div>
                                        </div>
                                    </section>
                                )}
                            </Dropzone>

                            <label className="mt-3">Recipe Contents:</label>
                            <p className="lead mb-2">
                                Here you can write a detailed description on how
                                your recipe works.
                            </p>
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
                    </div>
                </div>

                <div className="my-4">
                    <button
                        type="button"
                        className="btn btn-primary my-3"
                        onClick={handleRecipeSubmit}
                        disabled={loading}
                    >
                        Submit my recipe!
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
