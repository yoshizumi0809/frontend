import axios from 'axios';

export const sign_in = async (user_id: string, pass: string) => {
  const url = `http://localhost:3001/auth?user_id=${user_id}&password=${pass}`;
  const res = await axios.get(url);//urlにGETリクエストを送信し、
  console.log(res);
  return res
};