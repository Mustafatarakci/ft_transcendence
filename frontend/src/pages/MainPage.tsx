import React, { useContext } from 'react';
import { AllContext } from '../store';
import GamePage from './GamePage';
import LoginPage from './LoginPage';
import NicknamPage from './NicknamPage';

const MainPage: React.FC = () => {
  const { userStatus } = useContext(AllContext).userStatus;

  return (
    <>
      {
        {
          LOGOUT: <LoginPage />,
          SET_NICKNAME: <NicknamPage />,
          SECOND_AUTH: <GamePage />,
          LOGIN: <GamePage />,
        }[userStatus]
      }
    </>
  );
};

export default MainPage;
