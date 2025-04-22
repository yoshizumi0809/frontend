import React from 'react';
//import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn.tsx';  // 追加
import Main from './pages/Main.tsx';
import './App.css';
import { UserProvider } from "./providers/UserProvider.tsx";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </UserProvider>  
    </div>
  );
}

export default App;