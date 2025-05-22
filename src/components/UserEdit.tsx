import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import styled from 'styled-components';
import { getUserInfo } from '../api/User.tsx';

export default function UserEdit(){
      const { userInfo } = useContext(UserContext);
      const [ userName, setUserName ] = useState<string>('（読み込み中...）');
      const user_id = userInfo.id;
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
          <SFinishEditButton type="button" onClick={() => {}}>
            編集完了
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