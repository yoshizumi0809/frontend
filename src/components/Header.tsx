import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../providers/UserProvider.tsx";
import { getUser } from '../api/User.tsx';

export default function Header() {
  const navigate = useNavigate();
  const [ userName, setUserName ] = useState("");
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    setUserInfo({ id: 0, token: "" });
    navigate("/");
  };

  useEffect(() => {
    const myGetUser = async () => {
      const user = await getUser(userInfo.id, userInfo.token);
      setUserName(user.name);
    };
    myGetUser();
  }, []);

  return (

    <SHeader>
      <SLogo>MicroPost</SLogo>
      <SRightItem>
        <SName>{userName}</SName>
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

const SLogo = styled.div`
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

const SName = styled.div`
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
