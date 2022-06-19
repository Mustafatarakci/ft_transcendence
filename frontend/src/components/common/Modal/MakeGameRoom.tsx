import React from 'react';
import styled from '@emotion/styled';
import Button from '../Button';
import Modal from '.';

const MakeGameRoom: React.FC = () => {
  return (
    <Modal width={570} height={300} title={'방만들기'}>
      <MainBlock>
        <RoomName>방 제목</RoomName>
      </MainBlock>
    </Modal>
  );
};

// Main Block
const MainBlock = styled.div`
  padding: 13px;
  margin-top: 73px;
  width: 100%;
`;
//============================================

// Profile Section
const ProfileBlock = styled.div`
  height: 120px;
  display: flex;
`;
const UserInfo = styled.div``;

const PictureBlock = styled.div``;

const ProfilePicture = styled.img`
  width: 101px;
  height: 101px;
  border-radius: 50px;
  background: #c4c4c4;
`;

const UserName = styled.span`
  display: block;
  font-size: 20px;
  line-height: 23px;
  width: 75px;
  height: 25px;

  margin-top: 25px;
  margin-left: 25px;
`;

const UserLevel = styled.span`
  display: block;
  font-size: 14px;
  line-height: 16px;

  margin-top: 5px;
  margin-left: 25px;
`;
//============================================

//Record Section
const RecordBlock = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoomName = styled.span`
  font-size: 20px;
  line-height: 23px;

  margin-top: 70px;
  margin-left: 50px;
`;

const RoomPwd = styled.span`
  display: inline-block;
  font-size: 20px;
  line-height: 23px;

  margin-top: 71px;
`;

//============================================

//OtherBtnSection
const OtherBtnBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 20px;

  margin-top: 30px;
  & button {
    border-radius: 5px;
  }
`;
//============================================

export default MakeGameRoom;
