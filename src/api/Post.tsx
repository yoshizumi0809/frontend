import axios from 'axios'; //HTTP通信ライブラリ

const post = async (user_id: string, token: string, msg: string) => {
  //axios.postの第二引数はオブジェクト
  const data = {
    message: msg
  };
  const url = `http://localhost:3001/post?user_id=${user_id}&token=${token}`;
  //urlにPOSTリクエストを送信する。
  const res = await axios.post(url, data);
  console.log(res);
}

const getList = async (token: string, start = 0, records = 10) => {
  const url = `http://localhost:3001/post?token=${token}&start=${start}&records=${records}`;
  const res = await axios.get(url);
  return res.data;
};

export const getAllPosts = async (token: string) => {
  const url = `http://localhost:3001/post/all?token=${token}`;
  const res = await axios.get(url);
  return res.data;
};

const deletePost = async (postId: number, token: string) => {
  const url = `http://localhost:3001/post/${postId}?token=${token}`;
  const res = await axios.delete(url);
  console.log(res);
};

export { post, getList, deletePost };