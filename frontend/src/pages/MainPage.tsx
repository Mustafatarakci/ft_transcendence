import React, { useContext } from 'react';
import { AllContext } from '../store';
import GamePage from './HomePage';
import LoginPage from './LoginPage';
import NicknamPage from './NicknamPage';
import SecondAuthPage from './SecondAuthPage';

const MainPage: React.FC = () => {
  const { userStatus } = useContext(AllContext).userStatus;

  return (
    <>
      {
        {
          LOGOUT: <LoginPage />,
          SET_NICKNAME: <NicknamPage />,
          SECOND_AUTH: <SecondAuthPage />,
          LOGIN: <GamePage />,
        }[userStatus]
      }
    </>
  );
};

export default MainPage;
