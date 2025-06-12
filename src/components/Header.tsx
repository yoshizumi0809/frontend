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
  const [userId, setUserId] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ id: 0, token: "" });
    navigate("/");
  };

  useEffect(() => {
    const myGetUser = async () => {
      try {
        const user = await getUserInfo(userInfo.id);
        setUserName(user.name);
        setUserId(user.user_id); // ← user_idを保存
      } catch (err) {
        console.error("ユーザー情報取得失敗", err);
      }
    };
    if (userInfo.id !== 0) {
      myGetUser();
    }
  }, [userInfo.id]);

  return (

    <SHeader>
      <SLogo onClick={() => navigate(`/main`)}>MicroPost</SLogo>
      <SRightItem>
        <SName onClick={() => navigate(`/users/${userInfo.id}`)}>{userName}</SName>
        <SLogout onClick={logout}>ログアウト</SLogout>
      </SRightItem>
    </SHeader>
  );
}

const SHeader = styled.div`
  background-color: #222222;
  display: flex;
  flex-direction: row;
  color: #F8F8F8;
  padding-left: 8px;
  padding-right: 8px;
  height: 100%;
`

const SLogo = styled.button`
  padding-top: 8px;
  padding-bottom: 8px;
  text-align: center;
  justyify-content: start;
`

const SRightItem = styled.div`
  width:100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
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
