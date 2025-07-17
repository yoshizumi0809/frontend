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
  const [iconUrl, setIconUrl] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    getUserInfo(post.user_id).then((res) => {
      setLoginUserId(res.login_id);
      setIconUrl(res.icon_url);
    });
  }, [post.user_id]);

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
    await deletePost(post.post_id, userInfo.token);
    const newPosts = await getList(userInfo.token, (page - 1) * POSTS_PER_PAGE, POSTS_PER_PAGE);
    const postList = newPosts.map((p: any) => ({
      ...p,
      created_at: new Date(p.created_at),
    }));
    setPostList(postList);
    setMenuOpen(false);
  };

  const getLines = (src: string): ReactNode => {
    return src.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <SPost>
      <SHeaderRow>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <SImg onClick={() => navigate(`/users/${post.login_id}`)} src={iconUrl} alt="icon" />
          <SName onClick={() => navigate(`/users/${post.login_id}`)}>{post.user_name}</SName>
          <SDate>{getDateStr(post.created_at)}</SDate>
          {userInfo.user_id === post.user_id && (
            <SMenuWrapper>
              <SMoreButton onClick={() => setMenuOpen(!menuOpen)}>⋯</SMoreButton>
              {menuOpen && (
                <SMenu>
                  <SDeleteText onClick={onDeletePost}>投稿を削除</SDeleteText>
                </SMenu>
              )}
            </SMenuWrapper>
          )}
        </div>
      </SHeaderRow>
      <div>{getLines(post.content)}</div>
    </SPost>
  );
}

/* ----------------- styled-components ----------------- */

const SPost = styled.div`
  margin: 8px 0px;
  border-bottom: 1px solid #AAAAAA;
  text-align: left;
  padding: 8px;
  position: relative;
`;

const SHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #fff;
  padding: 2px;
  box-shadow: 0 0 0 2px white;
  margin-right: 8px;
`;

const SName = styled.span`
  font-size: small;
  color: #000044;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    text-decoration: underline;
  }
`;

const SDate = styled.span`
  font-size: small;
  color: #000044;
  margin-right: 4px;
`;

const SMoreButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
  margin-left: 4px;
`;

const SMenuWrapper = styled.div`
  position: relative;
`;

const SMenu = styled.div`
  position: absolute;
  top: 24px;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  padding: 4px 8px;
  border-radius: 4px;
  z-index: 10;
`;

const SDeleteText = styled.div`
  font-size: 14px;
  color: #d00;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
