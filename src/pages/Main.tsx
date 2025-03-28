import React from 'react';
import { useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout.tsx";
import { PostListProvider } from "../providers/PostListProvider.tsx";
import { UserContext } from "../providers/UserProvider.tsx";

export default function Main() {
  const { userInfo } = useContext(UserContext);
  const loggedIn = (userInfo.token !== '');
  console.log(loggedIn);

  return (
    <PostListProvider>
    {
      loggedIn ? <MainLayout />:<Navigate replace to="/" />
    }
    </PostListProvider>
  );
}
//test