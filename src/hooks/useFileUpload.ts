import { useDropzone } from "react-dropzone";
import { uploadFile } from "../api/file";
import { toast } from 'react-toastify';

export const useFileUpload = () => {
    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: { 'image/jpeg': ['.jpeg', '.png']}
      });
      const notifyError = (message: string) => toast.error(message);


      const upload = async (files: File[]) => {
        if(files.length === 0) return ''
        try {
          const res = await uploadFile(files[0]);
          return res.data.data.display_url;
        } catch (e) { notifyError('imageUploadError') }
      }

      return {
        getRootProps, getInputProps, acceptedFiles, upload
      }
};