import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { sign_in } from "../api/Auth.tsx";
import { sign_up } from '../api/User.tsx';
  
  export default function SignUp() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { userInfo, setUserInfo } = useContext(UserContext);
  
    //ログインボタンを押したときの関数
    const onSignUpClick = async () => {
        try {
          const res = await sign_up(userId, email, pass);
      
          // 登録成功したときの処理
          console.log("登録成功:", res.data);
      
          alert("登録が完了しました！ログインしてください。");
      
          // ログイン画面に戻る
          navigate("/signin");
      
        } catch (err: any) {
          console.error("登録エラー:", err);
          alert("登録に失敗しました。ユーザー名やメールアドレスがすでに使われている可能性があります。");
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
          <SLoginButton type="button" onClick={onSignUpClick}>
            Login
          </SLoginButton>
        </SSignInRow>
      </SSignInFrame>
    );
  }
  
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
  