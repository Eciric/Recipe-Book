import { useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from "../../services/auth-services/authService";
import image from "../../images/login-side.jpg";

const Login = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successful, setSuccessful] = useState("");
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value) {
            setUsernameError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!e.target.value) {
            setUsernameError("Username can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setPasswordError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!e.target.value) {
            setPasswordError("Password can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        if (!username) setUsernameError("Username field can't be empty!");
        if (!password) setPasswordError("Password field can't be empty!");

        if (
            !usernameError.length &&
            !passwordError.length &&
            username.length &&
            password.length
        ) {
            setLoading(true);
            login(username, password).then(
                () => {
                    setLoading(false);
                    setSuccessful(true);
                    setMessage("Login successful!");
                    setTimeout(() => {
                        history.push("/");
                        window.location.reload();
                    }, 500);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    if (error.response.status === 401) {
                        setMessage(
                            "Provided credentials couldn't be proven authentic."
                        );
                    } else {
                        setMessage(resMessage);
                    }
                    setLoading(false);
                    setSuccessful(false);
                }
            );
        }
    };

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">
                    Your data is safe with Recipe Book, or maybe not.
                </div>
                <div className="card-body ">
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <img
                                className="img-fluid login-image"
                                src={image}
                                alt=""
                            ></img>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                            <form onSubmit={handleLogin}>
                                <div className="form-group my-5">
                                    <label className="my-2">Username</label>
                                    <input
                                        type="text"
                                        className="form-control auth-control"
                                        id="inputUsername"
                                        placeholder="Your cool username..."
                                        autoComplete="off"
                                        onChange={handleUsernameChange}
                                        value={username}
                                    />

                                    {usernameError.length > 0 && (
                                        <span className="error">
                                            {usernameError}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group my-5">
                                    <label className="my-2">Password</label>
                                    <input
                                        type="password"
                                        className="form-control auth-control"
                                        id="inputPassword"
                                        placeholder="Your secure password..."
                                        onChange={handlePasswordChange}
                                        value={password}
                                    />

                                    {passwordError.length > 0 && (
                                        <span className="error">
                                            {passwordError}
                                        </span>
                                    )}
                                </div>
                                <br></br>
                                <button
                                    type="submit"
                                    className="btn btn-primary my-3"
                                    disabled={loading}
                                >
                                    Login!
                                </button>
                            </form>

                            {message.length > 0 &&
                                (successful ? (
                                    <div
                                        className="alert alert-success my-3"
                                        role="alert"
                                    >
                                        <p>{message}</p>
                                    </div>
                                ) : (
                                    <div
                                        className="alert alert-danger my-3"
                                        role="alert"
                                    >
                                        <p>{message}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
