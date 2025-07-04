import axios from "axios";

const getUser = async (id: number, token: string) => {
  const url = `http://localhost:3001/user/${id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const getUserInfo = async (user_id: number) => {
  const res = await axios.get(`http://localhost:3001/user/info/${user_id}`);
  return res.data;
};

const sign_up = async (name: string, user_id: string, email: string, pass: string) => {
  const data = {
    name: name,
    user_id: user_id,
    email: email,
    password: pass
  };
  const url = `http://localhost:3001/user?name={name}&user_id=${user_id}&email=${email}&password=${pass}`;
  const res = await axios.post(url,data);
  return res
};

const editUser = async (params: { id: number; user_id?: string; name?: string, icon_url?: string }) => {
  const { id, ...updates } = params;
  const url = `http://localhost:3001/user/${id}`;
  const res = await axios.put(url, updates);  // 必要なフィールドだけ送る
  return res.data;
};

export { getUser, sign_up, getUserInfo, editUser };