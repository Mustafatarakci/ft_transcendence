import React from 'react';
import styled from '@emotion/styled';
import LogoImg from '../../assets/logo-white.png';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <LogoWrap>
        <Logo src={LogoImg} alt="Home" />
      </LogoWrap>
      <Menus>
        <Menu>GAME</Menu>
        <Menu>CHAT</Menu>
      </Menus>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 15px 0;
  margin-bottom: 20px;
`;
const LogoWrap = styled.div`
  width: 300px;
`;
const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;

  cursor: pointer;
`;
const Menus = styled.ul`
  display: flex;
`;
const Menu = styled.li`
  width: 100px;
  color: white;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

export default Header;
