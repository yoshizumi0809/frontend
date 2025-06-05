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
  const [myUserId, setMyUserId] = useState<string | null>(null); // 自分の user_id

  // 表示対象ユーザーの名前取得
  useEffect(() => {
    if (!user_id) return;
    getUserInfo(Number(user_id))
      .then((res) => {
        setDisplayUserName(res.name);
      })
      .catch(() => {
        setDisplayUserName('取得失敗...');
      });
  }, [user_id]);

  // ログイン中のユーザーの user_id を取得
  useEffect(() => {
    if (!userInfo.id) return;
    getUserInfo(userInfo.id)
      .then((res) => {
        setMyUserId(res.user_id); // ここが string 型になる想定
      })
      .catch(() => {
        setMyUserId(null);
      });
  }, [userInfo.id]);

  return (
    <div>
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