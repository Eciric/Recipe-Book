import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../images/book.png";
import {
    logout,
    hasAdminAuthority,
} from "../../services/auth-services/authService";

const Navbar = ({ user }) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"));
        setIsAdmin(hasAdminAuthority(user));
    }, []);

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand mx-4" to="/">
                    <img
                        className="logo"
                        src={logo}
                        alt="Recipe Book Logo"
                    ></img>{" "}
                    Recipe Book
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav ms-auto me-4">
                        <li className="nav-item me-2">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {!user && (
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/login">
                                    Login
                                </Link>
                            </li>
                        )}

                        {!user && (
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/register">
                                    Sign up
                                </Link>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item me-2">
                                <Link className="nav-link" to="/recipecreator">
                                    Recipe Creator
                                </Link>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item me-2">
                                <Link
                                    className="nav-link"
                                    to={"/profile/" + user.username}
                                >
                                    Profile
                                </Link>
                            </li>
                        )}

                        {isAdmin && (
                            <li className="nav-item me-2">
                                <Link className="nav-link" to={"/adminpanel"}>
                                    Admin Panel
                                </Link>
                            </li>
                        )}

                        {user && (
                            <li className="nav-item me-2">
                                <a
                                    className="nav-link"
                                    href="/"
                                    onClick={logout}
                                >
                                    Logout
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
