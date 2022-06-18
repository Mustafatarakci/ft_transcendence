import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/styles/mixin';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import './utils/styles/common.css';
import OauthPage from './pages/OauthPage';
import NicknamPage from './pages/NicknamPage';
import SecondAuthPage from './pages/SecondAuthPage';
import HomePage from './pages/HomePage';
import ChatRoom from './components/Chat/ChatRoom';
import { AllContextApi } from './store';

function App() {
  return (
    <AllContextApi>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/callback" element={<OauthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/nickname" element={<NicknamPage />} />
            <Route path="/secondAuth" element={<SecondAuthPage />} />
            <Route path="/game" element={<HomePage />} />
            <Route path="/chat" element={<ChatRoom />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AllContextApi>
  );
}

export default App;
