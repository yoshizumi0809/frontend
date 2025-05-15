import React from 'react';
import UserProfileLayout from '../components/UserProfileLayout.tsx';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const params = useParams();
    console.log("params:", params); // 追加
    const user_id = params.user_id
    console.log("user_id from params:", user_id); // 追加

  return <UserProfileLayout user_id={user_id} />;
}