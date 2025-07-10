import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
//import { sign_in } from "../api/Auth.tsx";
import { sign_up } from '../api/User.tsx';
//import { sign_in } from '../api/Auth.tsx';
  
  export default function SignUp() {
    const navigate = useNavigate();
    const [name,   setName]   = useState("");
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const { userInfo, setUserInfo } = useContext(UserContext);
  
    //Registerボタンを押したときの関数
    const onSignUpClick = async () => {
        try {
          const res = await sign_up(name, userId, email, pass);

      // 2. 返却 { id, token } を Context へ
          setUserInfo({
            user_id: res.data.user_id,
            token: res.data.token,
          });

      // 3. そのままホームへ
          navigate("/main");
        } catch (err: any) {
            console.error("登録エラー:", err);
            const message = err.response?.data?.message || err.message || "登録に失敗しました";
            alert(`登録失敗：${message}`);
          }
      };
  
    return (
      <SSignUpFrame>
        {/* Name */}
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="name">Name</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="name"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </SSignUpInput>
        </SSignUpRow>

        {/* User ID */}
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="id">User&nbsp;ID</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="id"
              value={userId}
              type="text"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </SSignUpInput>
        </SSignUpRow>

        {/* Password */}
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="password">Password</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="password"
              value={pass}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </SSignUpInput>
        </SSignUpRow>

        {/* Email */}
        <SSignUpRow>
          <SSignUpLabel>
            <label htmlFor="email">Email</label>
          </SSignUpLabel>
          <SSignUpInput>
            <input
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
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
  