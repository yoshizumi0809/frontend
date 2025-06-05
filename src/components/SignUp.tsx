import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
//import { sign_in } from "../api/Auth.tsx";
import { sign_up } from '../api/User.tsx';
import { sign_in } from '../api/Auth.tsx';
  
  export default function SignUp() {
    //const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    //const { userInfo, setUserInfo } = useContext(UserContext);
  
    //Registerボタンを押したときの関数
    const onSignUpClick = async () => {
        try {
          await sign_up(userId, email, pass);      
          alert("登録が完了しました！");
  
          await sign_in(userId, pass);
      
        } catch (err: any) {
            console.error("登録エラー:", err);
            const message = err.response?.data?.message || err.message || "登録に失敗しました";
            alert(`登録失敗：${message}`);
          }
      };
  
    return (
      <SSignUpFrame>
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="id">ID</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="id"
              value={userId}
              type="text"
              onChange={(evt) => setUserId(evt.target.value)} //入力された文字列をuserIdとして更新
            />
          </SSignUpInput>
        </SSignUpRow>
  
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="password">Password</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="password"
              value={pass}
              type="password"
              onChange={(evt) => setPass(evt.target.value)}
            />
          </SSignUpInput>
        </SSignUpRow>

        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="email">email</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="email"
              value={email}
              type="email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </SSignUpInput>
        </SSignUpRow>
  
        <SSignUpRow>
          <SLoginButton type="button" onClick={onSignUpClick}>
            Register
          </SLoginButton>
        </SSignUpRow>
      </SSignUpFrame>
    );
  }
  
  const SSignUpFrame = styled.div`
    background-color: #f8f8f8;
    margin: 80px;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    box-shadow: 0 8px 8px #aaaaaa;
  `;
  
  const SSignUpRow = styled.div`
    dixplay: inline-block; /* Probably a typo: should be "display" */
    margin-top: 4px;
    margin-bottom: 4px;
  `;
  
  const SSignUpLabel = styled.span`
    display: inline-block;
    width: 25%;
    vertical-align: top;
    text-align: right;
    margin-right: 4px;
  `;
  
  const SSignUpInput = styled.span`
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
  