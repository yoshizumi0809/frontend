import React, { createContext, Dispatch, SetStateAction, useState } from "react";

// ポストを保持する型を定義
export type PostType = {
  id: number;
  user_name: string;
  content: string;
  created_at: Date;
};

export const PostListContext = createContext(
  {} as {
    postList: PostType[]; // ポストの配列を保持
    setPostList: Dispatch<SetStateAction<PostType[]>>;
    page: number
    setPage: Dispatch<SetStateAction<number>>
  },
);

export const PostListProvider = (props: any) => {
  const { children } = props;
  const [postList, setPostList] = useState<PostType[]>([]);
  const [page, setPage] = useState(1)
  return (
    <PostListContext.Provider value={{ postList, setPostList, page, setPage }}>
      {children}
    </PostListContext.Provider>
  );
};