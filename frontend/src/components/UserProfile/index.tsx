import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import axios from 'axios';
import ProfileImage from '../common/ProfileImage';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    id: '',
    user: '',
    user_nick: '',
    user_lv: '',
    gen_win: '',
    gen_lose: '',
    lad_win: '',
    lad_lose: '',
    picture: '',
  });

  // 리프레쉬할때 값이 조금 늦게 튀어나오는건 전역으로 데이터를 관리하면서
  // 다시 한번 확인하기로 결정
  useEffect(() => {
    axios.get(`http://localhost:4000/user_info`).then(res =>
      setUser({
        id: res.data.id,
        user: res.data.user,
        user_nick: res.data.user_nick,
        user_lv: res.data.user_lv,
        gen_win: res.data.gen_win,
        gen_lose: res.data.gen_lose,
        lad_win: res.data.lad_win,
        lad_lose: res.data.lad_lose,
        picture: res.data.picture,
      }),
    );
  }, []);

  return (
    <MainBlock>
      <MainText>내 프로필</MainText>
      <ProfileBlock>
        <PictureBlock>
          <ProfileImage src={user.picture} size={100} />
        </PictureBlock>
        <UserInfo>
          <UserName>{user.user_nick}</UserName>
          <UserLevel>lv.{user.user_lv}</UserLevel>
        </UserInfo>
      </ProfileBlock>

      <RecordText>전적/래더전적</RecordText>

      <RecordBlock>
        <Record>
          {user.gen_win}승 {user.gen_lose}패/{user.lad_win}승 {user.lad_lose}패
        </Record>
        <RecordBtn>
          <Button color="white2" text="전적 기록" width={97} height={30} />
        </RecordBtn>
      </RecordBlock>

      <OtherBtnBlock>
        <Button color="gradient" text="닉네임 변경" width={120} height={30} />
        <Button color="gradient" text="2차 인증 활성화" width={120} height={30} />
      </OtherBtnBlock>
    </MainBlock>
  );
};

// Main Block
const MainBlock = styled.div`
  background-color: white;
  border-radius: 20px;
  width: 300px;
  height: 340px;
  padding: 20px 25px;
  font-style: normal;
  font-weight: 400;
`;

// MainText Section
const MainText = styled.h3`
  font-size: 20px;
  line-height: 29px;

  color: ${props => props.theme.colors.main};
`;
//============================================

// Profile Section
const ProfileBlock = styled.div`
  height: 120px;
  display: flex;
`;
const UserInfo = styled.div``;

const PictureBlock = styled.div`
  margin-top: 20px;
  margin-left: 15px;
`;

const UserName = styled.span`
  display: block;
  font-size: 16px;
  line-height: 23px;

  margin-top: 45px;
  margin-left: 10px;
`;

const UserLevel = styled.span`
  display: block;
  font-size: 14px;
  line-height: 16px;

  margin-top: 5px;
  margin-left: 10px;
`;
//============================================

//RecordText Section
const RecordText = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 16px;

  margin-top: 50px;
`;
//============================================

//Record Section
const RecordBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Record = styled.span`
  display: inline-block;
  font-weight: 400px;
  font-size: 16px;

  text-align: center;
  margin-top: 15px;
`;

const RecordBtn = styled.div`
  margin-top: 10px;
  & button {
    border-radius: 5px;
  }
`;
//============================================

//OtherBtnSection
const OtherBtnBlock = styled.div`
  display: flex;
  margin-top: 10px;
  & button {
    border-radius: 5px;
    margin: 0;
    &:last-of-type {
      margin-left: 10px;
    }
  }
`;
//============================================

export default ProfilePage;
