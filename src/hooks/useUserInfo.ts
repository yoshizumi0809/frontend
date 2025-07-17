// hooks/useUserInfo.ts
import { useEffect, useState } from 'react';
import { getUserInfo } from '../api/User.tsx';


export function useUserInfo(user_id: number | undefined) {
  const [login_id, setLogin_id] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [icon_url, setIcon_url] = useState('');


  useEffect(() => {
    if (!user_id) return;

    getUserInfo(user_id)
      .then((res) => {
        setLogin_id(res.login_id);
        setName(res.name);
        setEmail(res.email);
        setIcon_url(res.icon_url);
      })
      .catch(() => {
        setLogin_id('取得失敗...');
        setName('取得失敗...');
        setEmail('取得失敗...');
        setIcon_url('取得失敗...');
      })
  }, [user_id]);

  return { login_id, name, email, icon_url};
}
