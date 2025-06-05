import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { editUser, getUserInfo } from '../api/User.tsx';
import { useNavigate } from 'react-router-dom';

export default function UserEdit(){
      const { userInfo, setUserInfo } = useContext(UserContext);
      const [ userName, setUserName ] = useState<string>('（読み込み中...）');
      const user_id = userInfo.id;
      const navigate = useNavigate();
      useEffect(() => {
        if (!user_id) return;
    
        getUserInfo(Number(user_id))
          .then((res) => {
            setUserName(res.name);
          })
          .catch(() => {
            setUserName('取得失敗...');
          });
      }, [user_id]);

    return(
    <div>
        <SEditRow>
          <SEditLabel>
            <label htmlFor="id">ユーザー名</label>
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
  
        <SEditRow>
          <SEditLabel>
            <label htmlFor="user_id">ユーザーID</label>
          </SEditLabel>
          <SEditInput>
            <input
              id="user_id"
              value={user_id}
              type="text"
            />
          </SEditInput>
        </SEditRow>

        <SEditRow>
          <SFinishEditButton
              type="button"
              onClick={async () => {
                try {
                  const updated = await editUser({ id: user_id, name: userName });
                  alert("編集完了しました！");
                  // 必要なら setUserInfo で更新
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
    )
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