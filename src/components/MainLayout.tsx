import React from 'react';
import styled from "styled-components";
import Header from "./Header.tsx";
import SideBar from "./SideBar.tsx";
import Contents from "./Contents.tsx";


export default function MainLayout() {
  return (
    <>
      <SHeader>
        <Header></Header>
      </SHeader>
      <SBody>
        <SSideBar>
          <SideBar></SideBar>
        </SSideBar>
        <SContents>
          <Contents></Contents>
        </SContents>
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

export const SSideBar = styled.div`
  border-right: 1px solid #222222;
  width: 30%;
  height: 100%;
`;

export const SContents = styled.div`
  width: 100%;
  height: 100%;
`;
