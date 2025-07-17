import React, { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { editUser, getUserInfo } from '../api/User.tsx';
import { useNavigate } from 'react-router-dom';
import { uploadImage } from '../api/Cloudinary.tsx';

export default function UserEdit(){
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ userName, setUserName ] = useState<string>('（読み込み中...）');
  const [ login_id, setLogin_id ] = useState<string>('（読み込み中...）');
  const [iconUrl, setIconUrl] = useState<string>("");
  const id = userInfo.user_id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getUserInfo(id)
      .then((res) => {
        setUserName(res.name);
        setLogin_id(res.login_id);
        setIconUrl(res.icon_url);
      })
      .catch(() => {
        setUserName('取得失敗...');
        setLogin_id('取得失敗...');
      });
  }, [id]);

  const iconRef = useRef<HTMLInputElement>(null);
  const editIcon = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setIconUrl(localUrl);
    setSelectedFile(file); // ← これが抜けている！！
  };


  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFinishEdit = async () => {
    try {
      let newIconUrl = iconUrl;

      if (selectedFile) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const result = await uploadImage(formData);
        newIconUrl = result.url || result.secure_url;
        setIconUrl(newIconUrl);
      }


      await editUser({ user_id:id, name: userName, login_id: login_id, icon_url: newIconUrl });

      alert("編集完了しました！");
      navigate(`/users/${login_id}`);
    } catch (err) {
      alert("更新に失敗しました");
      console.error(err);
    }
  };






  return (
    <div>
      {/* アイコン */}
      <SIcon>
        <img src={iconUrl} alt="画像" />
        <SEditIconButton onClick={()=>{iconRef.current?.click();}}>+</SEditIconButton>
        <input
          type="file"
          ref={iconRef}
          style={{ display: 'none' }}
          onChange={editIcon}
        />
      </SIcon>
      {/* ユーザー名 */}
      <SEditRow>
        <SEditLabel>
          <label htmlFor="userName">ユーザー名</label>
        </SEditLabel>
        <SEditInput>
          <input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
          />
        </SEditInput>
      </SEditRow>

      {/* ユーザーID（文字列、変更可） */}
      <SEditRow>
        <SEditLabel>
          <label htmlFor="login_id">ユーザーID</label>
        </SEditLabel>
        <SEditInput>
          <input
            id="login_id"
            value={login_id}
            onChange={(e) => setLogin_id(e.target.value)}
            type="text"
          />
        </SEditInput>
      </SEditRow>

      {/* 編集ボタン */}
      <SEditRow>
        <SFinishEditButton type="button" onClick={handleFinishEdit}>
          編集完了
        </SFinishEditButton>
      </SEditRow>
    </div>
  );
}

const SIcon = styled.div`
  position: relative;
`

const SEditIconButton = styled.button`
  position: absolute;
  color: white;
  font-size: 100px;
  top: 50%;
  left: 50%;
    transform: translate(-50%,-50%);
  cursor: pointer;
    background: none; /* 背景を消す */
    border: none; /* 枠を消す → ボタン感がなくなる */
`

const SEditRow = styled.div`
  display: block;
  margin-top: 4px;
  margin-bottom: 4px;
`;
const SEditLabel = styled.span`
  display: inline-block;
  width: 25%;
  text-align: right;
  margin-right: 4px;
`;
const SEditInput = styled.span`
  display: inline-block;
  margin-left: 4px;
`;
const SFinishEditButton = styled.button`
  background-color: purple;      /* メイン色 */
  color: #fff;
  padding: 8px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: #5e005e;   /* 濃いめの紫 */
  }
`;
