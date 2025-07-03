import React, { useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../api/User.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

type Props = {
  user_id?: string;
};

export default function UserProfileContent(props: Props) {
  const { user_id } = props;
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const [displayUserName, setDisplayUserName] = useState('（読み込み中...）');
  const [iconUrl, setIconUrl] = useState<string>("");
  const [myUserId, setMyUserId] = useState<string | null>(null); // ログイン中のユーザーの user_id

  // 表示対象ユーザーの名前を取得
  useEffect(() => {
    if (!user_id) return;
    getUserInfo(userInfo.user_id)
      .then((res) => {
        setDisplayUserName(res.name);
        setIconUrl(res.icon_url);
      })
      .catch(() => setDisplayUserName('取得失敗...'));
  }, [user_id]);

  // ログイン中ユーザーの user_id を取得
  useEffect(() => {
    if (!userInfo.user_id) return;
    getUserInfo(userInfo.user_id)
      .then((res) => setMyUserId(res.user_id)) // <- ここでログイン中の user_id を取得
      .catch(() => setMyUserId(null));
  }, [userInfo.user_id]);

  return (
    <div>
      <img src={iconUrl} alt="アイコン画像" />
      <h2>ユーザーネーム: {displayUserName}</h2>
      <h2>ユーザーID: {user_id}</h2>

      {myUserId === user_id && (
        <div>
          <SEditButton onClick={() => navigate(`/edit`)}>プロフィールを編集</SEditButton>
        </div>
      )}
    </div>
  );
}

const SEditButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
`