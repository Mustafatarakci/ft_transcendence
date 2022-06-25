import React, { useContext } from 'react';
import { AllContext } from '../store';
import GamePage from './HomePage';
import LoginPage from './LoginPage';
import NicknamePage from './NicknamePage';
import SecondAuthPage from './SecondAuthPage';
import ModalSet from '../components/common/Modal/ModalSet';

const MainPage: React.FC = () => {
  const { userStatus } = useContext(AllContext).userStatus;

  return (
    <>
      {
        {
          LOGOUT: <LoginPage />,
          SET_NICKNAME: <NicknamePage />,
          SECOND_AUTH: <SecondAuthPage />,
          LOGIN: <GamePage />,
        }[userStatus]
      }
      <ModalSet />
    </>
  );
};

export default MainPage;
