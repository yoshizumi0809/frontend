import { useEffect, useState } from 'react';
import { getUserIdByLoginId } from '../api/User.tsx';

export function useUserIdByLoginId(login_id?: string) {
  const [user_id, setUser_id] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (!login_id) return;

    getUserIdByLoginId(login_id)
      .then((id) => {
        setUser_id(id);
      })
      .catch((err) => {
        console.error('user_id の取得に失敗', err);
        setUser_id(undefined);
      });
  }, [login_id]);

  return { user_id };
}
