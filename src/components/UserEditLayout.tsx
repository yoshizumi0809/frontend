import React from 'react';
import UserEdit from './UserEdit.tsx';
import Header from './Header.tsx';
import styled from 'styled-components';

export default function UserEditLayout(){
    return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <UserEdit></UserEdit>
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
  flex-direction: row;
`;

