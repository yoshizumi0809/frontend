import React, { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import { editUser } from "../api/User.tsx";

export default function RegisterName() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await editUser({ id: userInfo.id, name }); // ← name のみ変更
      setUserInfo({ ...userInfo, name: updated.name });
      navigate("/main");
    } catch (err) {
      alert("ユーザー名の登録に失敗しました。");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ユーザー名を入力：
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">登録</button>
    </form>
  );
}
