import React, { useContext } from 'react';
import styled from "styled-components";
import { PostListContext } from '../providers/PostListProvider.tsx';

export default function Pagenation() {
  const { page, setPage } = useContext(PostListContext);

  const gotoPreviousPage = () => {
    setPage(Math.max(1, page - 1));
  };

  const gotoNextPage = () => {
    setPage(page + 1);
  };

  return (
    <SPagenation>
      <SButton onClick={gotoPreviousPage} disabled={page === 1}>« 前のページ</SButton>
      <SButton onClick={gotoNextPage}>次のページ »</SButton>
    </SPagenation>
  );
}

const SPagenation = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #ccc;
  gap: 12px; /* ← ボタン間の間隔 */
`;

const SButton = styled.button`
  background-color: #800080;
  color: #f0f0f0;
  padding: 4px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.85;
  }
`;
