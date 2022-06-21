import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Modal from '.';

const HandleSecondAuth: React.FC = () => {
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const [authMsg, setAuthMsg] = useState<string>('');
  const [authCode, setAuth] = useState<string>('');

  const validEmailChecker = () => {
    if (email === 'sgang@42.fr') {
      setEmailMsg('');
      alert(`정답ㅋ`);
    } else setEmailMsg('유효한 이메일이 아닙니다.');
  };

  const EmailhandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validEmailChecker();
    }
  };

  const authCodeChecker = () => {
    if (authCode === '1234') {
      setAuthMsg('');
      alert(`정답ㅋ`);
    } else setAuthMsg('코드가 일치하지 않습니다.');
  };

  const AuthhandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      authCodeChecker();
    }
  };

  return (
    <Modal width={570} height={510} title={'2차 인증 활성화'}>
      <MainBlock>
        <EmailText>2차인증을 설정할 이메일을 입력해주세요.</EmailText>
        <InputEmail
          onChange={event => {
            setEmail(event.target.value);
            setEmailMsg('');
          }}
          value={email}
          onKeyPress={EmailhandleEnter}
        />
        <ErrEmail>{emailMsg}</ErrEmail>
        <Button
          color="white"
          text="인증코드 발송"
          width={150}
          height={40}
          onClick={validEmailChecker}
        />
        <AuthBlock>
          <AuthText>인증 코드 : </AuthText>
          <InputAuthCode
            onChange={event => {
              setAuth(event.target.value);
              setAuthMsg('');
            }}
            value={authCode}
            onKeyPress={AuthhandleEnter}
          />
          <Button color="white" text="확인" width={70} height={35} onClick={authCodeChecker} />
        </AuthBlock>
        <ErrAuth>{authMsg}</ErrAuth>
        <Button color="gradient" text="활성화" width={200} height={40} />
      </MainBlock>
    </Modal>
  );
};

//Main Block
const MainBlock = styled.div`
  padding: 13px;
  width: 100%;

  & button {
    border-radius: 5px;
    &:first-of-type {
      margin-top: 10px;
    }
  }
`;
//============================================

//EmailSection
const EmailText = styled.span`
  display: block;
  width: 370px;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 400;
`;

const InputEmail = styled.input`
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  width: 300px;
  text-align: center;
  border: none;
  outline: none;
  border-bottom: 1px solid;
`;

const ErrEmail = styled.span`
  display: block;
  width: 370px;
  height: 14px;
  text-align: center;
  margin: 0 auto;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 400;
  color: #ff6363;
`;
//============================================

//AuthSection
const AuthBlock = styled.div`
  width: 370px;
  height: 45px;
  margin: 0 auto;
  margin-top: 50px;
  & button {
    display: inline-block;
    margin-left: 10px;
  }
`;

const AuthText = styled.span`
  width: 90px;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const InputAuthCode = styled.input`
  width: 180px;
  text-align: center;
  border: none;
  outline: none;
  border-bottom: 1px solid;
`;

const ErrAuth = styled.span`
  display: block;
  width: 370px;
  height: 14px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;

  font-size: 14px;
  font-weight: 400;
  color: #ff6363;
`;
//============================================
export default HandleSecondAuth;
