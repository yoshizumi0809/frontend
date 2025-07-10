import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../providers/UserProvider';
import { useUserInfo } from '../hooks/useUserInfo';
import { useUserIdByLoginId } from '../hooks/useUserIdByLoginId';

type Props = {
  login_id?: string;
};

export default function UserProfileContent({ login_id }: Props) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const { user_id } = useUserIdByLoginId(login_id);

  const target = useUserInfo(user_id);   
  /* 3) ログイン中ユーザーの情報（編集権限判定用） */
  const me = useUserInfo(userInfo.user_id);

  return (
    <div>
      <img src={target.icon_url} alt="アイコン画像" />
      <h2>ユーザーネーム: {target.name}</h2>
      <h2>ユーザーID: {login_id}</h2>

      {me.login_id === login_id && (
        <SEditButton onClick={() => navigate('/edit')}>
          プロフィールを編集
        </SEditButton>
      )}
    </div>
  );
}

/* ---------- styled-components ---------- */
const SEditButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
`;
