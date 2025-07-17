import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const sign_in = async (user_id: string, pass: string) => {
  const url = `${API_BASE_URL}/auth?user_id=${user_id}&password=${pass}`;
  const res = await axios.get(url);
  console.log(res);
  return res;
};
