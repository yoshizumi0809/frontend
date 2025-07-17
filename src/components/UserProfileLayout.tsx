import React from 'react';
import Header from './Header.tsx';
import styled from 'styled-components';
import UserProfileContent from './UserProfileContent.tsx';

type Props = {
    login_id?: string;
};

export default function UserProfileLayout(props:Props){
    const { login_id } = props;
    return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <UserProfileContent login_id={login_id} />
      </SBody>
    </>
  );
}

export const SHeader = styled.div`
  width: 100%;
  height: 48px;
  box-shadow: 0px 4px 4px #AAAAAA;
`;

export const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: center;  // 横方向中央
  align-items: center;      // 縦方向中央
  background-color: #f8f8f8; // 必要なら背景色も調整
`;