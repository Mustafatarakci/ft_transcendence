import React from 'react';
import styled from '@emotion/styled';
import GameListItem from './RoomListItem';
import { RoomListInterface } from '../../utils/interface';

interface RoomListProps {
  list: RoomListInterface[] | [];
}

const RoomList: React.FC<RoomListProps> = ({ list }) => {
  return (
    <RoomListContainer>
      {list.length > 0 &&
        list.map((li, index) => {
          return <GameListItem key={index} item={li} />;
        })}
    </RoomListContainer>
  );
};

const RoomListContainer = styled.ul`
  display: block;
  width: 100%;
  height: 100%;
  overflow: auto;
`;

export default RoomList;
