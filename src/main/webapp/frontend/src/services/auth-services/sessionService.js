import { logout } from "./authService";

export const startSession = () => {
    localStorage.setItem("sessionStart", Date.now());
};

export const endSession = () => {
    localStorage.removeItem("sessionStart");
    logout();
};

export const validateSession = () => {
    const date = new Date(JSON.parse(localStorage.getItem("sessionStart")));
    const now = new Date(Date.now());
    const hoursPassed = Math.abs(date - now) / 36e5;
    console.log(date, now, hoursPassed);
    return hoursPassed <= 1;
};
