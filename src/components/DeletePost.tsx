// DeletePost.tsx

import React from 'react';
import styled from "styled-components";

type Props = {
  postId: number;
  onDelete: () => Promise<void>; // 削除後の処理（例：一覧の更新など）
};

export default function DeletePost({ postId, onDelete }: Props) {
  return (
    <SDeleteButton onClick={onDelete}>
      投稿を削除
    </SDeleteButton>
  );
}

const SDeleteButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
`;
