import axios from "axios";

const getUser = async (user_id: number, token: string) => {
  const url = `http://localhost:3001/user/${user_id}?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const getUserInfo = async (user_id: number) => {
  const res = await axios.get(`http://localhost:3001/user/info/${user_id}`);
  return res.data;
};

const sign_up = async (user_id: string, email: string, pass: string) => {
  const data = {
    name: user_id,
    email: email,
    password: pass
  };
  const url = `http://localhost:3001/user?user_id=${user_id}&email=${email}&password=${pass}`;
  const res = await axios.post(url,data);
  return res
};

export { getUser, sign_up, getUserInfo };