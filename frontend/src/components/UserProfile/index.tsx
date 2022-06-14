import React from 'react';
import styled from '@emotion/styled';
import ProfileImg from '../../assets/rupi.jpg';
import Button from '../common/Button';

const ProfilePage: React.FC = () => {
  return (
    <MainBlock>
      <MainText>내 프로필</MainText>
      <ProfileBlock>
        <PictureBlock>
          <ProfilePicture src={ProfileImg} alt="img" />
        </PictureBlock>
        <Info>
          <UserName>
            Sgang
          </UserName>
          <UserLevel>
            lv.123
          </UserLevel>
        </Info>
      </ProfileBlock>

      <RecordText>전적/래더전적</RecordText>

      <RecordBlock>
        <Record>
          0승 0패/0승 0패
        </Record>
        <RecordBtn>
          <Button
            color='white'
            text='전적 기록'
            width={97}
            height={30}
          />
        </RecordBtn>
      </RecordBlock>

      <OtherBtnBlock>
        <Button
          color='gradient'
          text='닉네임 변경'
          width={120}
          height={30}
        />
        <Button
          color='gradient'
          text='2차 인증 활성화'
          width={120}
          height={30}
        />
      </OtherBtnBlock>
    </MainBlock>
  );
};


// Main div
const MainBlock = styled.div`
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 20px;
  width: 300px;
  height: 338px;
  padding-left:25px;
  padding-right:25px;
  font-style: normal;
  font-weight: 400;
`;

// div Lv1====================================
const MainText = styled.h3`
  font-size: 20px;
  line-height: 29px;
  margin-top: 20px;

  color: ${props => props.theme.colors.main};
`;
//============================================


// div Lv2====================================
const ProfileBlock = styled.div`
  height: 120px;
  display: flex;
`;
const Info = styled.div``;

const PictureBlock = styled.div``;

const ProfilePicture = styled.img`
  width: 101px;
  height: 101px;
  border-radius: 50px;
  background: #C4C4C4;
  margin-top:20px;
  margin-left:15px;
`;

const UserName = styled.span`
  display: block;
  font-size: 20px;
  line-height: 23px;

  margin-top: 45px;
  margin-left:10px;
`;

const UserLevel = styled.span`
  display: block;
  font-size: 14px;
  line-height: 16px;

  margin-top: 5px;
  margin-left:10px;
`;
//============================================


//div lv-3====================================
const RecordText = styled.span`
  display: inline-block;
  font-size: 14px;
  line-height: 16px;

  margin-top: 50px;
`;
//============================================


//div lv-4====================================
const RecordBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Record = styled.span`
  display: inline-block;
  
  text-align: center;
  margin-top: 15px;
`;

const RecordBtn = styled.div`
  margin-top: 10px;
  & button{
    border-radius: 5px;
  }
`;
//============================================


//div lv-5====================================
const OtherBtnBlock = styled.div`
  display: flex;
  margin-top: 10px;
  & button{
    border-radius: 5px;
    margin:0;
    &:last-of-type{
      margin-left:10px;
    }
  }
`;
//============================================


export default ProfilePage;
