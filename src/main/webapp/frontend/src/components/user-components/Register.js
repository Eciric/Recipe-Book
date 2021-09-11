import { useState } from "react";
import { isEmail } from "validator";
import Loader from "react-loader-spinner";
import { register } from "../../services/auth-services/authService";

const validateUsername = (username) => {
    return username.length > 2 && username.length < 20;
};

const validateEmail = (email) => {
    return isEmail(email);
};

const validatePassword = (password) => {
    return password.length > 8 && password.length < 60;
};

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
        if (e.target.value) {
            setUsernameError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!validateUsername(e.target.value)) {
            setUsernameError("Username must be between 2 and 20 characters!");
            e.target.style.border = "2px solid red";
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

        if (!validatePassword(e.target.value)) {
            setPasswordError("Password must be between 8 and 60 characters!");
            e.target.style.border = "2px solid red";
        }

        if (!e.target.value) {
            setPasswordError("Password can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setEmailError("");
            e.target.style.border = "1px solid #683ed1";
        }

        if (!validateEmail(e.target.value)) {
            setEmailError("Incorrect email form");
            e.target.style.border = "2px solid red";
        }

        if (!e.target.value) {
            setEmailError("Email can't be empty!");
            e.target.style.border = "2px solid red";
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username) setUsernameError("Username field can't be empty!");
        if (!password) setPasswordError("Password field can't be empty!");
        if (!email) setEmailError("Email field can't be empty!");

        if (
            !usernameError.length &&
            !passwordError.length &&
            !emailError.length &&
            username.length &&
            password.length &&
            email.length
        ) {
            setLoading(true);
            register(username, email, password).then(
                (response) => {
                    setSuccessful(true);
                    setLoading(false);
                    setMessage(response.data.message);
                },
                () => {
                    setSuccessful(false);
                    setLoading(false);
                    setMessage(
                        "Unknown error occured when attempting to register."
                    );
                }
            );
        }
    };

    return (
        <div className="container">
            <div className="card my-5 text-center">
                {loading && (
                    <div className="fullSpinnerContainer">
                        <Loader
                            type="MutatingDots"
                            color="#683ED1"
                            secondaryColor="#9b6dff"
                            height={100}
                            width={100}
                        />
                    </div>
                )}
                <div className="card-header">Register your account today!</div>
                <div className="card-body register-body">
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="form-group py-4">
                            <div className="register-form__email mb-4">
                                <label
                                    className="my-2"
                                    style={{ color: "white" }}
                                >
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control auth-control"
                                    id="inputEmail"
                                    autoComplete="off"
                                    placeholder="email@email.com..."
                                    onChange={handleEmailChange}
                                    value={email}
                                />

                                {emailError.length > 0 && (
                                    <div className="mt-3">
                                        <span className="error">
                                            {emailError}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="register-form__username mb-4">
                                <label
                                    className="my-2"
                                    style={{ color: "white" }}
                                >
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control auth-control"
                                    id="inputUsername"
                                    autoComplete="off"
                                    placeholder="A nice username..."
                                    onChange={handleUsernameChange}
                                    value={username}
                                />
                                {usernameError.length > 0 && (
                                    <div className="mt-3">
                                        <span className="error">
                                            {usernameError}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="register-form__password">
                                <label
                                    className="my-2"
                                    style={{ color: "white" }}
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control auth-control"
                                    id="inputPassword"
                                    placeholder="A secure password..."
                                    onChange={handlePasswordChange}
                                    value={password}
                                />

                                {passwordError.length > 0 && (
                                    <div className="mt-3">
                                        <span className="error">
                                            {passwordError}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-primary mb-5"
                            disabled={loading}
                        >
                            Create account!
                        </button>
                        {message.length > 0 &&
                            (successful ? (
                                <div
                                    className="alert alert-success py-3"
                                    role="alert"
                                >
                                    <p>{message}</p>
                                </div>
                            ) : (
                                <div
                                    className="alert alert-danger py-3"
                                    role="alert"
                                >
                                    <p>{message}</p>
                                </div>
                            ))}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
