import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserContext } from '../providers/UserProvider.tsx';
import { PostListContext, PostType } from '../providers/PostListProvider.tsx';
import { post, getList } from '../api/Post.tsx';
import { getUserInfo } from '../api/User.tsx';

export default function SideBar() {
  const [msg, setMsg] = useState('');
  const [profile, setProfile] = useState<{
    name: string;
    user_id: string;
    icon_url: string;
  } | null>(null);

  const { userInfo } = useContext(UserContext);
  const { setPostList } = useContext(PostListContext);

  /* -------------------------------- 投稿を取得 -------------------------------- */
  const getPostList = async () => {
    const posts = await getList(userInfo.token);

    const postList: PostType[] = posts?.map((p: any) => ({
      post_id: p.post_id,
      user_name: p.user_name,
      user_id: p.user_id,
      content: p.content,
      created_at: new Date(p.created_at),
    })) ?? [];

    setPostList(postList);
  };

  /* ------------------------------ 投稿送信ボタン ------------------------------ */
  const onSendClick = async () => {
    await post(String(userInfo.user_id), userInfo.token, msg);
    await getPostList();
  };

  /* ----------------------- プロフィール（アイコン含む） ----------------------- */
  useEffect(() => {
    (async () => {
      if (userInfo.user_id) {
        const res = await getUserInfo(userInfo.user_id);
        console.log('getUserInfo →', res);   // ★ ここ
        setProfile({
          name: res.name,
          user_id: res.login_id,     // ← ここが undefined ならレスポンスの key が違う
          icon_url: res.icon_url,
        });
      }
    })();
  }, [userInfo.user_id]);


  return (
    <SSideBar>
      <SProfileRow>
        {profile?.icon_url && <SIcon src={profile.icon_url} alt="icon" />}
        <div>
          <div>{profile?.name ?? '---'}</div>
          <div>@{profile?.user_id ?? '---'}</div>
        </div>
      </SProfileRow>

      <SSideBarRow>
        <SSideBarTextArea
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </SSideBarRow>

      <SSideBarRow>
        <SSideBarButton
          disabled={!msg}         // 空文字なら true → ボタン無効
          onClick={onSendClick}
        >
          送信
        </SSideBarButton>
      </SSideBarRow>
    </SSideBar>
  );
}

/* ---------------------------- styled-components ---------------------------- */

const SSideBar = styled.div`
  padding: 8px;
`;

const SSideBarRow = styled.div`
  margin: 4px 0;
  text-align: left;
`;

const SProfileRow = styled(SSideBarRow)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SIcon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const SSideBarTextArea = styled.textarea`
  width: 100%;
  border-radius: 4px;
  box-shadow: inset 0 2px 4px #cccccc;
`;

const SSideBarButton = styled.button`
  background-color: #800080;      /* 通常時 */
  padding: 4px;
  border-radius: 8px;
  color: #fafafa;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  /* ▼ disabled 時のスタイル */
  &:disabled {
    background-color: #888;    /* 薄いグレーなど好みの色に */
    cursor: not-allowed;
    opacity: 0.7;              /* さらに透過を加えると分かりやすい */
  }
`;