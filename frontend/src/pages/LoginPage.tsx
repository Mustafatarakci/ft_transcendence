import React from 'react';
import styled from '@emotion/styled';
import Button from '../components/common/Button';
import LogoImg from '../assets/logo.png';

const LoginPage: React.FC = () => {
  return (
    <LoginContainer>
      <LoginBox>
        <LogoWrap>
          <Logo src={LogoImg} alt="logo" />
        </LogoWrap>
        <Button
          width={200}
          height={50}
          color="gradient"
          text="42 Login"
          onClick={() => {
            console.log('click');
          }}
        />
      </LoginBox>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  background-color: ${props => props.theme.colors.main};
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const LoginBox = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  margin: 150px auto;
  border-radius: 20px;
  box-shadow: 6px 6px 10px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
`;
const LogoWrap = styled.div`
  width: 90%;
  margin: 100px auto 150px;
`;
const Logo = styled.img`
  width: 100%;
  height: 100px;
  object-fit: contain;
`;

export default LoginPage;
