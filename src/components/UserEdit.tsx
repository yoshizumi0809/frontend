import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { editUser, getUserInfo } from '../api/User.tsx';
import { useNavigate } from 'react-router-dom';

export default function UserEdit(){
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [ userName, setUserName ] = useState<string>('（読み込み中...）');
  const [ userId, setUserId ] = useState<string>('（読み込み中...）');
  const id = userInfo.id;
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    getUserInfo(id)
      .then((res) => {
        setUserName(res.name);
        setUserId(res.user_id);
      })
      .catch(() => {
        setUserName('取得失敗...');
        setUserId('取得失敗...');
      });
  }, [id]);

  return (
    <div>
      {/* ユーザー名 */}
      <SEditRow>
        <SEditLabel>
          <label htmlFor="userName">ユーザー名</label>
        </SEditLabel>
        <SEditInput>
          <input
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
          />
        </SEditInput>
      </SEditRow>

      {/* ユーザーID（文字列、変更可） */}
      <SEditRow>
        <SEditLabel>
          <label htmlFor="userId">ユーザーID</label>
        </SEditLabel>
        <SEditInput>
          <input
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            type="text"
          />
        </SEditInput>
      </SEditRow>

      {/* 編集ボタン */}
      <SEditRow>
        <SFinishEditButton
          type="button"
          onClick={async () => {
            try {
              await editUser({ id: id, name: userName, user_id: userId });
              alert("編集完了しました！");
            } catch (err) {
              alert("更新に失敗しました");
              console.error(err);
            }
          }}
        >
          編集完了!
        </SFinishEditButton>
      </SEditRow>
    </div>
  );
}


const SEditRow = styled.div`
    display: block;
    margin-top: 4px;
    margin-bottom: 4px;
  `;
  
  const SEditLabel = styled.span`
    display: inline-block;
    width: 25%;
    vertical-align: top;
    text-align: right;
    margin-right: 4px;
  `;
  
  const SEditInput = styled.span`
    display: inline-block;
    width: auto;
    vertical-align: top;
    margin-left: 4px;
  `;

  const SFinishEditButton = styled.button`
    background-color: #444444;
    color: #f0f0f0;
    padding: 4px 16px;
    border-radius: 8px;
  `;