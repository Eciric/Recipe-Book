import axios from 'axios';
import authHeader from '../services/authHeader';

const API_UPLOAD_URL = 'http://localhost:8080/api/files/uploadProfilePicture';
const API_DOWNLOAD_URL = 'http://localhost:8080/api/files/downloadProfilePicture';

export const uploadProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(API_UPLOAD_URL, {
        method: 'post',
        body: formData,
        headers: authHeader()
    });

    return res;
}

export const downloadProfilePicture = async () => {
    const res = await axios.get(API_DOWNLOAD_URL, {
        headers: authHeader()
    });
    return res;
}