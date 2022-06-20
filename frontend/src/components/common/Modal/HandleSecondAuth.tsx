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
      setEmailMsg('');
      alert(`정답ㅋ`);
    } else setEmailMsg('코드가 일치하지 않습니다.');
  };

  const AuthhandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      authCodeChecker();
    }
  };

  return (
    <Modal width={570} height={510} title={'2차 인증 활성화'}>
      <MainBlock>
        <SecondAutoText>2차인증을 설정할 이메일을 입력해주세요.</SecondAutoText>
        <Input
          onChange={event => {
            setEmail(event.target.value);
            setEmailMsg('');
          }}
          value={email}
          onKeyPress={EmailhandleEnter}
        />
        <CheckerText>{emailMsg}</CheckerText>
        <BtnBlock>
          <Button
            color="white"
            text="인증코드 발송"
            width={150}
            height={40}
            onClick={validEmailChecker}
          />
        </BtnBlock>
        <>
          <SecondAutoText>인증 코드: </SecondAutoText>
          <Input
            onChange={event => {
              setAuth(event.target.value);
              setAuthMsg('');
            }}
            value={email}
            onKeyPress={AuthhandleEnter}
          />
          <Button color="white" text="확인" width={150} height={40} onClick={authCodeChecker} />
        </>
      </MainBlock>
    </Modal>
  );
};

//Main Block
const MainBlock = styled.div`
  padding: 13px;
  width: 100%;
`;
//============================================

//============================================
//SecondAutoText
const SecondAutoText = styled.span`
  display: block;
  width: 350px;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 400;
  &:last-of-child {
    display: none;
    width: 90px;
  }
`;
//Input
const Input = styled.input`
  display: block;
  margin: 0 auto;
  margin-top: 30px;
  width: 300px;
  text-align: center;
  border: none;
  outline: none;
  border-bottom: 1px solid;
  &:last-of-child {
    display: none;
    width: 190px;
  }
`;
//CheckerText
const CheckerText = styled.span`
  display: block;
  width: 350px;
  height: 14px;
  text-align: center;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 14px;
  color: #ff6363;
`;
//============================================

//BtnSection
const BtnBlock = styled.div`
  margin: 0 auto;
  margin-top: 15px;
  //   display: flex;
  //   justify-content: center;
  //   & button {
  //     border-radius: 5px;
  //     margin: 0;
  //     &:last-of-type {
  //       margin-left: 40px;
  //     }
  //   }
`;
//============================================

export default HandleSecondAuth;
