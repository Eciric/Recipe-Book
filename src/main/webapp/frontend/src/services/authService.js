import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

export const login = (username, password) => {
    return axios
    .post(API_URL + "signin", {
        username,
        password
    })
    .then(response => {
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
    });
}

export const logout = () => {
    localStorage.removeItem("user");
}

export const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password
    });
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));;
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
    login,
    logout,
    register,
    getCurrentUser
};