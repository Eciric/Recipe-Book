import axios from "axios";
import { startSession } from "./sessionService";

const API_URL = "http://localhost:8080/api/auth/";

export const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
                startSession();
            }
            return response.data;
        });
};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const hasAdminAuthority = (user) => {
    if (!user) return false;
    let roles = user.roles;
    if (roles) {
        let found = 0;
        roles.forEach((role) => {
            if (role === "ROLE_ADMIN") {
                found = 1;
            }
        });
        if (found) return true;
    }
    return false;
};

export const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return user !== null && user !== undefined;
};
