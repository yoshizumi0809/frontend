//一個一個の投稿に対する表示について

import React, { useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import { ReactNode } from 'react';
import { deletePost, getList } from '../api/Post.tsx';
import { UserContext } from '../providers/UserProvider.tsx';
import { PostListContext } from '../providers/PostListProvider.tsx';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from '../api/User.tsx';

export default function Post(props: any) {
  const { post } = props;
  const { userInfo } = useContext(UserContext);
  const { setPostList, page } = useContext(PostListContext);
  const [loginUserId, setLoginUserId] = useState<string>("");
  const navigate = useNavigate();
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
  getUserInfo(post.user_id).then((res) => {
    setLoginUserId(res.user_id); // ← ここでは「ログインID（文字列）」をセット
  });
}, [post.user_id]);

  console.log("自分のID:", userInfo.id, typeof userInfo.id);
  console.log("投稿者ID:", post.user_id, typeof post.user_id);

  const getDateStr = (dateObj: Date) => {
    const year = post.created_at.getFullYear();
    const month = post.created_at.getMonth() + 1;
    const date = post.created_at.getDate();
    const hour = post.created_at.getHours();
    const min = post.created_at.getMinutes();
    const sec = post.created_at.getSeconds();
    return `${year}年${month}月${date}日 ${hour}時${min}分${sec}秒`;
  };

  const onDeletePost = async () => {
    await deletePost(post.id, userInfo.token);
    const newPosts = await getList(userInfo.token, (page - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE);
    const postList = newPosts.map((p: any) => ({
      ...p,
      created_at: new Date(p.created_at),
    }));
    setPostList(postList);
  };

  const getLines = (src: string):ReactNode => {
    return src.split('\n').map((line, index) => {
      return (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      )
    });
  }

  return (
    <SPost>
      <div>
        <SName onClick={() => navigate(`/users/${loginUserId}`)}>{post.user_name}</SName>
        <SDate>{getDateStr(post.created_at)}</SDate>
        {userInfo.id === post.user_id && (
          <span>
            <SDeleteButton onClick={onDeletePost}>投稿を削除</SDeleteButton>
          </span>
        )}
      </div>
      <div>{getLines(post.content)}</div>
    </SPost>
  );
}

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding-left: 8px;
`

const SName = styled.button`
  font-size: small;
  color: #000044;
`

const SDate = styled.span`
  margin-left: 8px;
  font-size: small;
  color: #000044;
`

const SDeleteButton = styled.button`
  background-color: #222222;
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
`