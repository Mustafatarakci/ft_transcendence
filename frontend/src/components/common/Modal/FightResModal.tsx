import React, { useContext } from 'react';
import styled from '@emotion/styled';
import Modal from '.';
import Button from '../Button';
import { AllContext } from '../../../store';

const FightResModal: React.FC = () => {
  const { setModal } = useContext(AllContext).modalData;

  const cancelFight = () => {
    console.log('대결을 취소했습니다(신청한 사람)');
    setModal(null);
  };
  return (
    <Modal width={400} height={200}>
      <ModalWrap>
        <FightMsg>BBB님의</FightMsg>
        <FightMsg>응답 대기중...</FightMsg>
        <CancelBtnWrap>
          <Button width={110} height={30} color="white" text="취소" onClick={cancelFight} />
        </CancelBtnWrap>
      </ModalWrap>
    </Modal>
  );
};

const FightMsg = styled.h3`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  line-height: 23px;
`;

const ModalWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const CancelBtnWrap = styled.div`
  margin-top: 15px;
  & button {
    font-size: 18px;
    border-radius: 5px;
  }
`;

export default FightResModal;
