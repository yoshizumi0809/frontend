import React from 'react';
import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout.tsx";
import { PostListProvider } from "../providers/PostListProvider.tsx";
import { UserContext } from "../providers/UserProvider.tsx";

export default function Main() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = (userInfo.token !== '');
  const isNameMissing = (userInfo.name === undefined || userInfo.name === '');

  if (!loggedIn) {
    return <Navigate replace to="/" />;
  }

  if (loggedIn && isNameMissing) {
    return <Navigate replace to="/register_name" />;
  }

  return (
    <PostListProvider>
      <MainLayout />
    </PostListProvider>
  );
}