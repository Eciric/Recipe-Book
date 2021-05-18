import defaultImage from "../images/user.png";
import { base64toBlob } from "../services/base64ToBlob";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
    downloadProfilePicture,
    uploadProfilePicture,
} from "../services/fileService";
import Loader from "react-loader-spinner";
import RecipeTile from "./RecipeTile";
import pancakes from "../images/pancakes.jpg";
import brownies from "../images/brownies.jpg";
import cookies from "../images/cookies.jpg";

const Profile = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [profileUri, setProfileUri] = useState(defaultImage);
    const [userRecipes, setUserRecipes] = useState([]);
    const { username } = useParams();
    const inputFile = useRef(null);
    const onButtonClick = () => {
        inputFile.current.click();
    };

    useEffect(() => {
        setLoading(true);
        setUserRecipes([]);
        downloadProfilePicture()
            .then((res) => {
                if (res.status === 200) {
                    let blob = base64toBlob(res.data.bytes, "image/png");
                    const objectURL = URL.createObjectURL(blob);
                    setProfileUri(objectURL);
                } else {
                    setProfileUri(defaultImage);
                }
                setLoading(false);
            })
            .catch((err) => {
                setErrorMessage(err);
                setLoading(false);
            });
    }, []);

    const onFileChange = (event) => {
        event.stopPropagation();
        event.preventDefault();
        var file = event.target.files[0];
        if (file) {
            setLoading(true);
            uploadProfilePicture(file)
                .then((res) => {
                    if (res.ok) {
                        const reader = new FileReader();
                        reader.addEventListener(
                            "load",
                            function () {
                                setProfileUri(reader.result);
                                setLoading(false);
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
                    setLoading(false);
                });
        }
    };

    return (
        <div id="profileContainer" className="container my-5">
            <div className="profilePictureContainer ">
                {loading ? (
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
                {userRecipes.length ? (
                    <div className="row justify-content-around">
                        {userRecipes.map((recipe) => {
                            let title = recipe.title;
                            let img = recipe.img;
                            return <RecipeTile title={title} img={img} />;
                        })}
                    </div>
                ) : (
                    <div className="mb-5">
                        <p>No recipes? Add some now!</p>
                        <a href="/recipecreator" className="my-1">
                            <button
                                type="button"
                                className="btn btn-primary my-3"
                            >
                                Create your first recipe!
                            </button>
                        </a>
                    </div>
                )}
            </div>

            <br></br>
        </div>
    );
};

export default Profile;
