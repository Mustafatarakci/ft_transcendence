import axios from 'axios';
import React, { useEffect, useContext } from 'react';
import { AllContext } from '../store';
import { LOGIN, LOGOUT, SET_NICKNAME, SECOND_AUTH } from '../utils/interface';
import { useNavigate } from 'react-router-dom';

const OauthPage: React.FC = () => {
  const { userStatus, setUserStatus } = useContext(AllContext).userStatus;
  const { setUser } = useContext(AllContext).userData;
  const navigate = useNavigate();

  useEffect(() => {
    // test 용 api
    if (userStatus !== LOGOUT) {
      return navigate('/');
    }
    const getUser = async () => {
      const { data } = await axios('http://localhost:4000/user');
      setUser('login', {
        id: data.id,
        nickname: data.nickname,
        email: data.email,
        profileImg: data.profileImg,
        secondAuth: data.secondAuth,
      });
      if (!data.nickname) {
        setUserStatus(SET_NICKNAME);
      } else if (data.secondAuth) {
        setUserStatus(SECOND_AUTH);
      } else {
        setUserStatus(LOGIN);
      }
    };
    getUser();
  }, [userStatus]);

  return <></>;
};

export default OauthPage;
