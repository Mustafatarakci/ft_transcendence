import React, { useEffect, useContext } from 'react';
import { AllContext } from '../store';
import { LOGIN, SET_NICKNAME, SECOND_AUTH } from '../utils/interface';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authAPI } from '../API';

const OauthPage: React.FC = () => {
  const { setUserStatus } = useContext(AllContext).userStatus;
  const { setUser } = useContext(AllContext).userData;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    const getUser = async () => {
      if (code) {
        const res = await authAPI.isSignedUp({ code });
        if (res) {
          setUser(LOGIN, {
            id: res.id,
            nickname: res.nickname,
            email: res.email,
            avatar: res.avatar,
            isSecondAuthOn: res.isSecondAuthOn,
            jwt: res.jwt,
          });
          // NOTE: 임시로 LocalStorage에 jwt 저장
          window.localStorage.setItem('jwt', res.jwt);
          if (!res.nickname) {
            setUserStatus(SET_NICKNAME);
          } else if (res.isSecondAuthOn) {
            setUserStatus(SECOND_AUTH);
          } else {
            setUserStatus(LOGIN);
          }
          navigate('/');
        }
      }
    };
    // NOTE: 한번에 두번 요청되는것을 막기 위해 설정
    const timer = setTimeout(() => {
      getUser();
      clearTimeout(timer);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <></>;
};

export default OauthPage;
