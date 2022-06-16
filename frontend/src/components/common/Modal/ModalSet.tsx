import React, { useContext } from 'react';
import Modal from '.';
import LadderModal from '../../Game/LadderModal';
import { AllContext } from '../../../store';

const ModalSet: React.FC = () => {
  const { modal } = useContext(AllContext).modalData;
  return (
    <>
      {modal &&
        {
          LOADING_LADDER_GAME: <LadderModal />,
          SHOW_PROFILE: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 프로필 정보 보기
          HANDLE_SECOND_AUTH: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 이메일 인증
          EDIT_NICKNAME: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 닉네임 수정
          MAKE_GAME_ROOM: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 게임방 만들기
          MAKE_CHAT_ROOM: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 채팅방 만들기
          ENTER_GAME_ROOM: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 비밀 게임방 입장
          ENTER_CHAT_ROOM: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 비밀 채팅방 입장
          CHECK_SCORE: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 전적 확인
          EDIT_CHAT_ROOM: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 채팅방 수정
          SHOW_OWNER_PROFILE: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 채팅방 소유자 프로필
          SHOW_MANAGER_PROFILE: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 채팅방 관리자 프로필
          CHECK_LOGOUT: (
            <Modal width={200} height={200}>
              test
            </Modal>
          ), // 로그아웃 확인
        }[modal]}
    </>
  );
};

export default ModalSet;
