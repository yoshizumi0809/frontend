import React, { useContext } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";
import { useUserInfo } from '../hooks/useUserInfo.ts';

export default function Header() {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ user_id: 0, token: "" });
    navigate("/");
  };

  const { name, login_id, icon_url } = useUserInfo(userInfo.user_id);


  return (
    <SHeader>
      <SLogo onClick={() => navigate(`/main`)}>MicroPost</SLogo>
      <SRightItem>
        <SImg onClick={() => navigate(`/users/${login_id}`)} src={icon_url} alt="icon" />
        <SLogout onClick={logout}>ログアウト</SLogout>
      </SRightItem>
    </SHeader>
  );
}


const SHeader = styled.div`
  background-color: #800080;
  display: flex;
  flex-direction: row;
  position: relative; /* 自身の位置を決定 */
  justify-content: space-between; /* 右側で等間隔にそろえる */
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`

const SLogo = styled.button`
  font-size: 24px; /* ← 文字サイズ大きく */
  font-weight: bold;
  color: white;

  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  appearance: none;

  /* 中央寄せのために flex を使う */
  display: flex;
  align-items: center; /* ← 上下中央揃え */
  justify-content: center;

  height: 100%;
  padding: 0 16px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;


const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`


const SImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
  background-color: white;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  margin: 0 6px;
  cursor: pointer;
`;

const SLogout = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`
