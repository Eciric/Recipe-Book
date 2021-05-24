export const isLoggedIn = () => {
    const user = localStorage.getItem("user");
    return user !== null && user !== undefined;
};
