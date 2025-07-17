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

const getUserIdByLoginId = async (login_id: string): Promise<number> => {
  const url = `http://localhost:3001/user/idTologin/${login_id}`;
  const res = await axios.get(url);
  return res.data; // 数値 (user_id) が返ることを期待
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

/**
   * プロフィールを更新する
   * @param params.id        数値の user_id (PK)
   * @param params.login_id  文字列のログインID
   * @param params.name      ユーザー名
   * @param params.icon_url  アイコンURL
   */
  const editUser = async (params: {
    user_id: number;
    login_id?: string;
    name?: string;
    icon_url?: string;
  }) => {
    const { user_id, ...updates } = params;                 // updates = { login_id, name, icon_url }
    const url = `http://localhost:3001/user/${user_id}`;    // ★ フル URL に固定
    return (await axios.put(url, updates)).data;            // 200 OK なら更新成功
  };

export { getUser, sign_up, getUserInfo, editUser, getUserIdByLoginId };