import axiosInstance from "../config/axiosConfig";

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
    return axiosInstance.post<UploadFileRes>(API_URL, formData);
};

export {uploadFile}