import authHeader from "../auth-services/authHeader";

const API_GET_USER_DATA_URL = "http://localhost:8080/api/users/getUserData";
const API_GET_ALL_USERS_URL = "http://localhost:8080/api/users/getAllUsers";
const API_UPDATE_USER_URL = "http://localhost:8080/api/users/updateUser";
const API_DELETE_USER_BY_ID_URL =
    "http://localhost:8080/api/users/deleteUserById";

export const getUserData = async (username, id) => {
    const res = fetch(API_GET_USER_DATA_URL, {
        method: "post",
        body: JSON.stringify({ username: username, id: id }),
        headers: { "Content-Type": "application/json" },
    }).then((res) => {
        return res.json();
    });
    return res;
};

export const getAllUsers = async () => {
    return fetch(API_GET_ALL_USERS_URL, {
        method: "get",
        headers: authHeader(),
    });
};

export const deleteUserById = async (id) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_DELETE_USER_BY_ID_URL, {
        method: "delete",
        body: JSON.stringify({
            username: null,
            id: id,
        }),
        headers: header,
    });
};

export const updateUser = async (id, username, roles, email) => {
    let header = authHeader();
    header["Content-Type"] = "application/json";
    return fetch(API_UPDATE_USER_URL, {
        method: "post",
        body: JSON.stringify({
            user_id: id,
            username: username,
            roles: roles,
            email: email,
        }),
        headers: header,
    });
};
