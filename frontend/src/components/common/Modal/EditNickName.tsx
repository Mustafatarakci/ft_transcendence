import React, { useState } from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Modal from '.';

const EditNickName: React.FC = () => {
  const [emailMsg, setEmailMsg] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const validEmailChecker = () => {
    if (email === 'sgang') {
      setEmailMsg('');
      alert(`올ㅋ`);
    } else setEmailMsg('중복된 닉네임입니다.');
  };

  const EmailhandleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      validEmailChecker();
    }
  };

  return (
    <Modal width={570} height={400} title={'닉네임 변경'}>
      <MainBlock>
        <NickNameText>새로운 닉네임을 입력해주세요.</NickNameText>
        <AuthBlock>
          <InputAuthCode
            onChange={event => {
              setEmail(event.target.value);
              setEmailMsg('');
            }}
            value={email}
            onKeyPress={EmailhandleEnter}
          />
          <Button
            color="white"
            text="중복 체크"
            width={100}
            height={40}
            onClick={validEmailChecker}
          />
        </AuthBlock>
        <ErrAuth>{emailMsg}</ErrAuth>
        <Button color="gradient" text="변경" width={200} height={40} />
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

//NickNameSection
const NickNameText = styled.span`
  display: block;
  width: 300px;
  text-align: center;
  margin: 0 auto;
  margin-top: 40px;
  font-size: 20px;
  font-weight: 400;
`;
//============================================

//AuthSection
const AuthBlock = styled.div`
  width: 360px;
  height: 45px;
  margin: 0 auto;
  margin-top: 50px;
  & button {
    display: inline-block;
    margin-left: 10px;
  }
`;

const InputAuthCode = styled.input`
  width: 250px;
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
export default EditNickName;
