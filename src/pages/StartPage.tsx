import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function StartPage() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>ようこそ！</h2>
      <SButton onClick={() => navigate("/signin")}>ログイン</SButton>
      <SButton onClick={() => navigate("/signup")}>サインアップ</SButton>
    </div>
  );
}

const SButton = styled.button`
    background-color: #800080;
    color: #f0f0f0;
    padding: 4px 16px;
    border-radius: 8px;
  `;