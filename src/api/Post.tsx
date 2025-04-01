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

const getList = async (token: string) => {
  const url = `http://localhost:3001/post?token=${token}&records=10`;
  const res = await axios.get(url);
  return res.data;
};

export { post, getList };