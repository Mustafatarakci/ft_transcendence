import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import axios from 'axios';

/*
 ** 제이슨서버에서 유저리스트를 받아와 정렬합니다.
 ** 리스트를 유저네임기준 오름차순으로 정렬 후, 상태 (로그인, 게임중) vs 로그아웃으로 비교하여 정렬합니다.
 */
const UserList: React.FC = () => {
  const [userList, setuserList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/userlist').then(({ data }) => {
      data.sort((a: any, b: any) => {
        if (a.status === b.status) {
          return a.username.localeCompare(b.username);
        } else {
          if (b.status === 'off') return b.status.localeCompare(a.status);
        }
      });
      setuserList(data);
    });
  }, []);

  /*
   ** click       : 탭메뉴 클릭된 상태 체크.
   ** tuserColor  : 전체유저 컬러박스.
   ** fuserColor  : 친구유저 컬러박스.
   */
  const [click, setClick] = useState(1);
  const [tuserColor, setTuserColor] = useState('white');
  const [fuserColor, setFuserColor] = useState('white');
  return (
    <div>
      <ListBox>
        <ButtonBox>
          <Button
            color={tuserColor}
            text="전체유저"
            width={120}
            height={40}
            onClick={() => {
              setClick(0);
              setTuserColor('gradient');
              setFuserColor('white');
            }}
          />
          <Button
            color={fuserColor}
            text="친구"
            width={120}
            height={40}
            onClick={() => {
              setClick(1);
              setTuserColor('white');
              setFuserColor('gradient');
            }}
          />
        </ButtonBox>
        <UserContainer>
          {click === 1 ? (
            <div>
              {userList.map((list: any, index: any) => (
                <div key={index}>
                  {list.isfriend && (
                    <ul>
                      {list.status === 'on' ? (
                        <UserItem status={list.status} key={index}>
                          <Circle id="circle"></Circle>
                          <div style={{ height: 35 }}>{list.username}</div>
                        </UserItem>
                      ) : (
                        <UserItem status={list.status} key={index}>
                          <Circle id="circle"></Circle>
                          <div style={{ height: 35 }}>{list.username}</div>
                        </UserItem>
                      )}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {userList.map((list: any, index: any) => (
                <div key={index}>
                  <ul>
                    {list.status === 'on' ? (
                      <UserItem status={list.status} key={index}>
                        <Circle id="circle"></Circle>
                        <div style={{ height: 35 }}>{list.username}</div>
                      </UserItem>
                    ) : (
                      <UserItem status={list.status} key={index}>
                        <Circle id="circle"></Circle>
                        <div style={{ height: 35 }}>{list.username}</div>
                      </UserItem>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </UserContainer>
      </ListBox>
    </div>
  );
};

/*상태값 확인해서, 서클의 색을 바꿔야되니까*/
const Circle = styled.div`
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.green};
  border: 1px solid ${props => props.theme.colors.green};
`;

/*서클의 프롭스는, 말그대로 서클에대한거고
유저아이텐에 프롭스는, 유저이름을 감싸는 박스*/
const UserItem = styled.li<{ status: string }>`
  #circle {
    width: 8px;
    height: 8px;
    line-height: 8px;
    ${props =>
      props.status === 'play'
        ? `background-color: ${props.theme.colors.red};border: 1px solid ${props.theme.colors.red};`
        : props.status === 'on'
        ? `background-color: ${props.theme.colors.green};border: 1px solid ${props.theme.colors.green};`
        : `background-color: ${props.theme.colors.deepGrey};border: 1px solid ${props.theme.colors.deepGrey};`}
  }
  border: 1px solid ${props => props.theme.colors.grey};
  display: flex;
  justify-content: left;
  align-items: center;
  width: 250px;
  height: 35px;
  line-height: 30px;
  margin-top: 10px;
  padding-left: 20px;
  border-radius: 10px;
  background-color: transparent;
  font-style: normal;
  font-size: 14px;
  ${props => props.status === 'off' && `color: ${props.theme.colors.deepGrey};`}
`;

/*
 ** 탭메뉴(전체유저, 친구)의 부모태그입니다.
 ** 전체유저 태그에 오른쪽마진으로 피그마와 비슷한 간격을 만들어주고, 두버튼의 폰트사이즈를 지정합니다.
 **
 */
const ButtonBox = styled.div`
  /* 아마도 3항연산으로 컬러값을 다르게 넣어봅시다 클릭이  */
  & :first-of-type {
    margin-right: 15px;
  }
  & button {
    font-size: 18px;
  }
  /* 그래서 저스티파이로 좌우여백을 정렬한다.. */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/*
 ** 스크롤 스타일과 동작을 지정합니다.
 ** 공간에 커서를 가져다 대면, 스타일된 스크롤이 표시됩니다.
 */
const UserContainer = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  :hover {
    ::-webkit-scrollbar {
      display: block;
      width: 4px;
      background-color: ${props => props.theme.colors.grey};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.colors.main};
      border-radius: 10px;
    }
  }
  overflow-y: scroll;
  height: 320px;
  width: 270px;
`;

const ListBox = styled.div`
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 20px;
  min-width: 300px;
  width: 300px;
  height: 422px;
  padding: 17px 23px;
`;

export default UserList;
