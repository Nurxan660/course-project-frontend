import axios from "axios";

const API_URL = process.env.REACT_APP_FILE_UPLOAD_URL || '';
const API_KEY = process.env.REACT_APP_FILE_UPLOAD_KEY || '';

interface UploadFileRes {
    data: {
        display_url: string;
    }
}

const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", API_KEY);
    return axios.post<UploadFileRes>(API_URL, formData);
};

export {uploadFile}