import React from 'react';
//import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';  // 追加
import Main from './pages/Main.tsx';
import './App.css';
import { UserProvider } from "./providers/UserProvider.tsx";
import StartPage from './pages/StartPage.tsx';
import SignUp from './pages/SignUp.tsx';
import UserEditLayout from './components/UserEditLayout.tsx';
import UserProfile from './pages/UserProfile.tsx';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
          <Route path="/edit" element={<UserEditLayout />} />
          <Route path="/users/:login_id" element={<UserProfile />} />
        </Routes>
      </UserProvider>  
    </div>
  );
}

export default App;