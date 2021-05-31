const API_GET_USER_DATA_URL = "http://localhost:8080/api/users/getUserData";

export const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return user !== null && user !== undefined;
};

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
