import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Button from '../common/Button';
import GameList from './RoomList';
import { RoomListInterface } from '../../utils/interface';

const Game: React.FC = () => {
  const [gameList, setGameList] = useState<RoomListInterface[] | []>([]);

  useEffect(() => {
    const getGameList = async () => {
      const { data } = await axios('http://localhost:4000/gameList');
      setGameList(data);
    };
    getGameList();
  }, []);

  return (
    <>
      <LadderGame>
        <Button width={160} height={40} color="gradient" text="래더 게임 매칭" />
      </LadderGame>
      <GameList list={gameList} />
    </>
  );
};

const LadderGame = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 20px;
  button {
    margin: 0;
    font-size: 14px;
    font-weight: bold;
  }
`;

export default Game;
