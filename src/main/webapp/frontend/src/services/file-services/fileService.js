import authHeader from "../auth-services/authHeader";

const API_UPLOAD_URL = "http://localhost:8080/api/files/uploadProfilePicture";

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(API_UPLOAD_URL, {
        method: "post",
        body: formData,
        headers: authHeader(),
    });

    return res;
};
