import { useState } from "react";
import { register } from "../services/authService";
import { isEmail } from "validator";
import registerImage from "../images/register.jpg";

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
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setSuccessful(false);
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        }
    };

    return (
        <div className="container">
            <div className="card my-5 text-center">
                <div className="card-header">Register your account today!</div>
                <div className="card-body register-body">
                    <img
                        src={registerImage}
                        alt=""
                        className="img-fluid register-image"
                    ></img>
                    <form className="register-form" onSubmit={handleRegister}>
                        <div className="form-group my-4">
                            <label
                                className="my-2"
                                style={{ color: "#e684ee" }}
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control auth-control"
                                id="inputEmail"
                                placeholder="email@email.com..."
                                onChange={handleEmailChange}
                                value={email}
                            />

                            {emailError.length > 0 && (
                                <span className="error">{emailError}</span>
                            )}
                        </div>

                        <div className="form-group my-4">
                            <label
                                className="my-2"
                                style={{ color: "#e684ee" }}
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control auth-control"
                                id="inputUsername"
                                placeholder="A nice username..."
                                onChange={handleUsernameChange}
                                value={username}
                            />

                            {usernameError.length > 0 && (
                                <span className="error">{usernameError}</span>
                            )}
                        </div>

                        <div className="form-group my-4">
                            <label
                                className="my-2"
                                style={{ color: "#e684ee" }}
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
                                <span className="error">{passwordError}</span>
                            )}
                        </div>
                        <br></br>
                        <button
                            type="submit"
                            className="btn btn-primary mb-5"
                            disabled={loading}
                        >
                            Create account!
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
    );
};

export default Register;
