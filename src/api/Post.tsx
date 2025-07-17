import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

const post = async (user_id: string, token: string, msg: string) => {
  const data = { message: msg };
  const url = `${API_BASE_URL}/post?user_id=${user_id}&token=${token}`;
  const res = await axios.post(url, data);
  console.log(res);
};

const getList = async (token: string, start = 0, records = 10) => {
  const url = `${API_BASE_URL}/post?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

export const getAllPosts = async (token: string) => {
  const url = `${API_BASE_URL}/post/all?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const deletePost = async (postId: number, token: string) => {
  const url = `${API_BASE_URL}/post/${postId}?token=${token}`;
  const res = await axios.delete(url);
  console.log(res);
};

export { post, getList, deletePost };
