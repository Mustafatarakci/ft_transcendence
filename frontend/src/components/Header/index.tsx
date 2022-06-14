import React from 'react';
import styled from '@emotion/styled';
import LogoImg from '../../assets/logo-white.png';
import { MenuType, GAME, CHAT } from '../../utils/interface';

interface HeaderProps {
  onClickMenu: (menuType: MenuType) => void;
}

const Header: React.FC<HeaderProps> = ({ onClickMenu }) => {
  return (
    <HeaderContainer>
      <LogoWrap onClick={() => onClickMenu(GAME)}>
        <Logo src={LogoImg} alt="Home" />
      </LogoWrap>
      <Menus>
        <Menu onClick={() => onClickMenu(GAME)}>GAME</Menu>
        <Menu onClick={() => onClickMenu(CHAT)}>CHAT</Menu>
      </Menus>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
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
const Menus = styled.nav`
  display: flex;
`;
const Menu = styled.span`
  display: inline-block;
  width: 100px;
  color: white;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;

export default Header;
