import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { sign_in } from "../api/Auth.tsx";
  
  export default function SignIn() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [pass, setPass] = useState("");
    const { userInfo, setUserInfo } = useContext(UserContext);
  
    //ログインボタンを押したときの関数
    const onSignInClick = async () => {
      const ret = await sign_in(userId, pass);
      console.log("レスポンス全体:", ret);         // AxiosResponse
      console.log("レスポンス data:", ret.data);   // 実際のデータ部分
      if (ret.data) {
        console.log("レスポンス data.token:", ret.data.token);
      }
      setUserInfo({
        id: ret.data.user_id,
        token: ret.data.token,
      });
      if (ret && ret.data && ret.data.token) {
        navigate('/main');
      }
    };
  
    return (
      <SSignInFrame>
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="id">ID</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="id"
              value={userId}
              type="text"
              onChange={(evt) => setUserId(evt.target.value)} //入力された文字列をuserIdとして更新
            />
          </SSignInInput>
        </SSignInRow>
  
        <SSignInRow>
          <SSignInLabel>
            <label htmlFor="password">Password</label>
          </SSignInLabel>
          <SSignInInput>
            <input
              id="password"
              value={pass}
              type="password"
              onChange={(evt) => setPass(evt.target.value)}
            />
          </SSignInInput>
        </SSignInRow>
  
        <SSignInRow>
          <SLoginButton type="button" onClick={onSignInClick}>
            Login
          </SLoginButton>
        </SSignInRow>
      </SSignInFrame>
    );
  }
  //test
  const SSignInFrame = styled.div`
    background-color: #f8f8f8;
    margin: 80px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    box-shadow: 0 8px 8px #aaaaaa;
  `;
  
  const SSignInRow = styled.div`
    dixplay: inline-block; /* Probably a typo: should be "display" */
    margin-top: 4px;
    margin-bottom: 4px;
  `;
  
  const SSignInLabel = styled.span`
    display: inline-block;
    width: 25%;
    vertical-align: top;
    text-align: right;
    margin-right: 4px;
  `;
  
  const SSignInInput = styled.span`
    display: inline-block;
    width: auto;
    vertical-align: top;
    margin-left: 4px;
  `;
  
  const SLoginButton = styled.button`
    background-color: #444444;
    color: #f0f0f0;
    padding: 4px 16px;
    border-radius: 8px;
  `;
  