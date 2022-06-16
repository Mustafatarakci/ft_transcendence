import React, { useState } from 'react';
import styled from '@emotion/styled';

const UserList: React.FC = () => {
  const [click, setClick] = useState(1);
  const [tuserColor, setTuserColor] = useState('white');
  const [fuserColor, setFuserColor] = useState('white');
  // const [back, backClick] = useState(1);
  return (
    <div>
      <ListBox>
        <ButtonBox>
          <TabMenu
            type="button"
            value="전체유저"
            color={tuserColor}
            onClick={() => {
              setClick(0);
              setTuserColor('');
              setFuserColor('white');
            }}
          ></TabMenu>
          <TabMenu
            type="button"
            value="친구"
            color={fuserColor}
            onClick={() => {
              setClick(1);
              setFuserColor('');
              setTuserColor('white');
            }}
          ></TabMenu>
        </ButtonBox>
        {click === 1 && (
          <div>
            <UserBox>🤷🏾‍♀️ junselee</UserBox>
            <UserBox>🤷🏾‍♀️ tjung</UserBox>
            <UserBox>🤷🏾‍♀️ hyechoi</UserBox>
          </div>
        )}
        {click === 0 && (
          <ul>
            <UserBox>
              <a href="#id1" style={{ textDecoration: 'none', color: '#000' }}>
                🤷🏻‍♂️ sgang
              </a>
            </UserBox>
            <UserBox>🤷🏻‍♂️ dhyeon</UserBox>
            <UserBox>🤷🏻‍♂️ mosong</UserBox>
          </ul>
        )}
      </ListBox>
    </div>
  );
};

/*임시에요!! 진짜로!*/
const UserBox = styled.li`
  list-style: none;
  border: 1px solid ${props => props.theme.colors.grey};
  width: 255px;
  height: 35px;
  line-height: 30px;
  margin-top: 10px;
  padding-left: 20px;
  border-radius: 10px;
  //text-align: left; 빼도됨
  background-color: transparent;
  font-style: normal;
  font-size: 18px;
`;

const ButtonBox = styled.div`
  /* 아마도 3항연산으로 컬러값을 다르게 넣어봅시다 클릭이  */
  & :first-of-type {
    /* margin-right: 19px; */
  }
  & :hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.white};
    /* 항상이 아니고 눌럿을때 반영되어야댐 */
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
  //margin: 0, auto;
  //flex-wrap: wrap;
  margin-bottom: 24px;
  display: flex;
  /* 그래서 저스티파이로 좌우여백을 정렬한다.. */
  justify-content: space-between;
  align-items: center;
`;

const ListBox = styled.div`
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 20px;
  min-width: 300px;
  width: 300px;
  height: 422px;
  padding: 17px 23px;
  //text-align: center;
  //display: flex;
  //flex-direction: column;
  /* justify-content: center; */
`;

const Tab = styled.div`
  /* font-size: 0;
  width: 600px; */
  /* float: left;
  width: 600px;
  height: 290px; */
`;
const Tabnav_box = styled.ul`
  /* font-size: 0;
  width: 600px; */
  border: 1px solid #ddd;
`;
const Tabcontent_box = styled.div`
  padding: 20px;
  height: 244px;
  border: 1px solid #ddd;
  border-top: none;
`;
const Input_box = styled.div`
  background-color: transparent;
  display: flex;
  font-size: 14px;
  border: 1px solid #b2b2b2;

  width: 150px;
  height: 40px;
`;

const TabMenu = styled.input`
  background: ${({ color, theme }) => (color === 'white' ? 'transparent' : `${theme.colors.main}`)};
  box-shadow: ${({ color }) =>
    color === 'white' ? 'transparent' : `2px 2px 2px 2px rgba(0, 0, 0, 0.1)`};
  color: ${({ color, theme }) => (color === 'white' ? `${theme.colors.main}` : 'white')};
  border: 1px solid ${props => props.theme.colors.main};
  width: 120px;
  height: 40px;
  border-radius: 10px;
  text-align: center;
  //background-color: transparent;
  font-style: normal;
  font-size: 18px;
`;

export default UserList;
