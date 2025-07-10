import React from 'react';
import UserProfileLayout from '../components/UserProfileLayout.tsx';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
    const params = useParams();
    const login_id = params.login_id

  return <UserProfileLayout login_id={login_id} />;
}