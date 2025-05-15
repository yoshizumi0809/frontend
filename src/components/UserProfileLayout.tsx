import React from 'react';
import Header from './Header.tsx';
import styled from 'styled-components';
import UserProfileContent from './UserProfileContent.tsx';

type Props = {
    user_id?: string;
};

export default function UserProfileLayout(props:Props){
    const { user_id } = props;
    return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <UserProfileContent user_id={user_id} />
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