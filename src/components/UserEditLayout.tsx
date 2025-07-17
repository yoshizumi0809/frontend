// UserEditLayout.tsx
import React from 'react';
import UserEdit from './UserEdit.tsx';
import Header from './Header.tsx';
import styled from 'styled-components';

export default function UserEditLayout() {
  return (
    <>
      <SHeader>
        <Header />
      </SHeader>

      <SBody>
        <SCard>
          <UserEdit />
        </SCard>
      </SBody>
    </>
  );
}


export const SHeader = styled.div`
  width: 100%;
  height: 48px;
  box-shadow: 0 4px 4px #aaaaaa;
`;


export const SBody = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  justify-content: center;   /* 横方向中央 */
  align-items: center;       /* 縦方向中央 */
  background: #f8f8f8;       /* 任意：薄い背景色 */
`;


const SCard = styled.div`
  width: 420px;              /* お好みで */
  padding: 32px 40px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;