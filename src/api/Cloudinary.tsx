import axios from 'axios';

const uploadImage = async (formData) => {
  const url = `http://localhost:3001/icon`;
  const res = await axios.put(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export { uploadImage };
