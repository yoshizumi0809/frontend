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
  const [ userName, setUserName ] = useState<string>('（読み込み中...）');
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user_id) return;

    getUserInfo(userInfo.id)
      .then((res) => {
        setUserName(res.name);
      })
      .catch(() => {
        setUserName('取得失敗...');
      });
  }, [user_id]);

  return (
    <div>
      <h2>ユーザーネーム: {userName}</h2>
      <h2>ユーザーID: {user_id}</h2>
      {userInfo.id === Number(user_id)&& (
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