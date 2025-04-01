import React, { useContext, useState } from 'react';
import styled from "styled-components";
import { UserContext } from "../providers/UserProvider.tsx";
import { PostListContext, PostType } from "../providers/PostListProvider.tsx";
import { post, getList } from "../api/Post.tsx";

export default function SideBar() {
  const [msg, setMsg] = useState("");
  const { userInfo } = useContext(UserContext);  // コンテキストからuserInfoを取り出す
  const { setPostList } = useContext(PostListContext);

  const getPostList = async () => {
    /* 
    変数postsは以下のような感じ
  [
  　{
    id: 1,
    user_name: "Taro",
    content: "こんにちは！",
    created_at: "2025-04-01T12:00:00.000Z"
  　},
  ...
  ]
    */
    const posts = await getList(userInfo.token);

    console.log(posts);
    //ポストを格納する配列を初期化
    let postList: Array<PostType> = [];
    if (posts) {
      console.log(posts);
      
      posts.forEach((p: any) => {
        postList.push({
          id: p.id,
          user_name: p.user_name,
          content: p.content,
          created_at: new Date(p.created_at),
        });
      });
    }
    setPostList(postList);
  };

  const onSendClick = async () => {
    await post(String(userInfo.id), userInfo.token, msg);
    await getPostList();
  };

  return (
    <SSideBar>
      <SSideBarRow>hoge</SSideBarRow>
      <SSideBarRow>hoge@example.com</SSideBarRow>
      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(evt) => setMsg(evt.target.value)}
        />
      </SSideBarRow>
      <SSideBarRow>
        <SSideBarButton onClick={onSendClick}>送信</SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
}

const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin-top: 4px;
  margin-bottom: 4px;
  text-align: left;
`;

const SSideBarTextArea = styled.textarea`
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #cccccc;
`;

const SSideBarButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
`;