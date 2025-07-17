import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../providers/UserProvider.tsx';
import { useUserInfo } from '../hooks/useUserInfo.ts';
import { useUserIdByLoginId } from '../hooks/useUserIdByLoginId.ts';


type Props = {
  login_id?: string;
};

export default function UserProfileContent({ login_id }: Props) {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  const { user_id } = useUserIdByLoginId(login_id);

  const target = useUserInfo(user_id);   
  const me = useUserInfo(userInfo.user_id);

  return (
    <SCard>
      <img src={target.icon_url} alt="アイコン画像" style={{ width: "100px", borderRadius: "50%" }} />
      <h2>ユーザーネーム: {target.name}</h2>
      <h2>ユーザーID: {login_id}</h2>

      {me.login_id === login_id && (
        <SEditButton onClick={() => navigate('/edit')}>
          プロフィールを編集
        </SEditButton>
      )}
    </SCard>
);

}

/* ---------- styled-components ---------- */
const SEditButton = styled.button`
  background-color: purple;
  padding: 8px 16px;
  border-radius: 8px;
  color: #fafafa;
  border: none;
  cursor: pointer;
  margin-top: 12px;

  &:hover {
    background-color: #5e005e;
  }
`;


const SCard = styled.div`
  padding: 24px;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  text-align: center;
`;
