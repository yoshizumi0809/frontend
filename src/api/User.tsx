import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


const getUser = async (id: number, token: string) => {
  const url = `${API_BASE_URL}/user/${id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const getUserInfo = async (user_id: number) => {
  const res = await axios.get(`${API_BASE_URL}/user/info/${user_id}`);
  return res.data;
};

const getUserIdByLoginId = async (login_id: string): Promise<number> => {
  const url = `${API_BASE_URL}/user/idTologin/${login_id}`;
  const res = await axios.get(url);
  return res.data;
};

const sign_up = async (name: string, user_id: string, email: string, pass: string) => {
  const data = { name, user_id, email, password: pass };
  const url = `${API_BASE_URL}/user?name=${name}&user_id=${user_id}&email=${email}&password=${pass}`;
  const res = await axios.post(url, data);
  return res;
};

const editUser = async (params: {
  user_id: number;
  login_id?: string;
  name?: string;
  icon_url?: string;
}) => {
  const { user_id, ...updates } = params;
  const url = `${API_BASE_URL}/user/${user_id}`;
  return (await axios.put(url, updates)).data;
};

export { getUser, sign_up, getUserInfo, editUser, getUserIdByLoginId };