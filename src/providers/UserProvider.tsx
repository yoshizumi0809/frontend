import { useState, createContext, Dispatch, SetStateAction } from "react";
import React from "react";

// 保持する情報の型

type UserInfo = {
  id: number;
  token: string;
};

// UserContextの作成
export const UserContext = createContext(
  {} as {
    userInfo: UserInfo;
    setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  },
);

// UserProviderの定義
export const UserProvider = (props: any) => {
  const { children } = props;
  // UserInfoを保持する変数と更新関数の作成
  const [userInfo, setUserInfo] = useState<UserInfo>({ id: 0, token: ""});
  return (
    //valueに格納されている変数を子componentが取得できるようにする。
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};