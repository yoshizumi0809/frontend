import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";
import { getUserInfo } from '../api/User.tsx';
import { getUser } from '../api/User.tsx';

export default function Header() {
  const navigate = useNavigate();
  const [ userName, setUserName ] = useState("");
  const [ userId, setUserId ] = useState("");
  const [ iconUrl, setIconUrl ] = useState<string>("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ user_id: 0, token: "" });
    navigate("/");
  };

  useEffect(() => {
    if (!userInfo.user_id || isNaN(userInfo.user_id)) return;

    const myGetUser = async () => {
      try {
        const user = await getUserInfo(userInfo.user_id);
        setUserName(user.name);
        setUserId(user.user_id); // ← user_idを保存
        setIconUrl(user.icon_url);
      } catch (err) {
        console.error("ユーザー情報取得失敗", err);
      }
    };

    myGetUser();
  }, [userInfo.user_id]);


  return (
    <SHeader>
      <SLogo onClick={() => navigate(`/main`)}>MicroPost</SLogo>
      <SRightItem>
        <SName onClick={() => navigate(`/users/${userInfo.user_id}`)}>{userName}</SName>
        <SImg onClick={() => navigate(`/users/${userId}`)} src={iconUrl} alt="icon"/>
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
  padding-top: 8px;
  padding-bottom: 8px;
  position: absolute;
  left: 50%; /* 親位置に対して左から50％の位置に配置 */
  text-align: center;
  justyify-content: start;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
`

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
`


const SImg = styled.img`
  width: 30px;
  height: 30px;
  borderRadius: '50%';
  verticalAlign: 'middle';
  marginRight: '6px';
`

const SName = styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  margin-right: 8px;
`

const SLogout = styled.div`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
`
