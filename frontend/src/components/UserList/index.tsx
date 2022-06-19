import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Button from '../common/Button';
import axios from 'axios';

/*
 ** 제이슨서버에서 유저리스트를 받아와 정렬합니다.
 ** 리스트를 유저네임기준 오름차순으로 정렬 후, 상태 (로그인, 게임중) vs 로그아웃으로 비교하여 정렬합니다.
 ** 서클과 균형을 맞추기 위해서 넣었던 유저네임의 div가 필요없어져서 삭제함 <---- div에 바로 스타일주는거 고치라던 요청사항 수정중 2222
 ** 삼항연산으로 클릭을 확인하고, 또다시 친구관계를 확인하던 복잡한 구조를 개선함 <---- 요청사항 333
 ** useState 두개로 컬러값을 클릭마다 설정해주던거를, 버튼컬러에대한 삼항연산으로 개선했습니다.
 ** 전체유저버튼과 친구버튼의 클릭상태를 체크하는 useState 'click'의 이름을 직관적으로 수정하였습니다. 'allUser'
 ** props는 타입은 오브젝트로 수정.
 */
const UserList: React.FC = () => {
  const [userList, setuserList] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:4000/userlist').then(({ data }) => {
      data.sort((a: any, b: any) => {
        if (a.status === b.status) {
          return a.username.localeCompare(b.username);
        } else {
          return b.status.localeCompare(a.status);
        }
      });
      data.sort((a: any, b: any) => {
        if (a.status !== 'off' && b.status !== 'off') {
          return a.username.localeCompare(b.username);
        }
      });
      setuserList(data);
    });
  }, []);
  type ActiveMenuType = 'ALL' | 'FRIEND';

  const [activeMenu, setActiveMenu] = useState<ActiveMenuType>('ALL');
  return (
    <ListBox>
      <ButtonBox>
        <Button
          color={activeMenu === 'ALL' ? 'gradient' : 'white'}
          text="전체유저"
          width={120}
          height={40}
          onClick={() => {
            setActiveMenu('ALL');
          }}
        />
        <Button
          color={activeMenu === 'FRIEND' ? 'gradient' : 'white'}
          text="친구"
          width={120}
          height={40}
          onClick={() => {
            setActiveMenu('FRIEND');
          }}
        />
      </ButtonBox>
      <UserContainer>
        <ul>
          {userList.map((list: any, index: number) =>
            activeMenu === 'ALL' ? (
              <UserItem status={list.status} key={index} onClick={() => console.log(list.username)}>
                {list.username}
              </UserItem>
            ) : (
              list.isfriend && (
                <UserItem
                  status={list.status}
                  key={index}
                  onClick={() => console.log(list.username)}
                >
                  {list.username}
                </UserItem>
              )
            ),
          )}
        </ul>
      </UserContainer>
    </ListBox>
  );
};

/*
 * 서클(유저현재상태표시) 프롭스 : 서클 커스텀
 * 유저아이텐에 프롭스는, 유저이름을 감싸는 박스 커스텀
 * #circle 로 아이템박스에 정의하던 속성 합쳤습니다 <-- 다솜님 요청사항
 * 서클 컴포넌트가 유저아이템의 가상요소(pseudo element) before로 합쳐졌습니다.
 */
const UserItem = styled.li<{ status: string }>`
  ::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 15px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.green};
    width: 8px;
    height: 8px;
    ${props =>
      props.status === 'play'
        ? `background: ${props.theme.colors.red};`
        : props.status === 'on'
        ? `background: ${props.theme.colors.green};`
        : `background: ${props.theme.colors.deepGrey};`}
  }
  //마우스 포인트 버튼되는 형태로. >> 이후 추가할 이벤트를 위해서 임시로.
  cursor: pointer;
  position: relative;
  border: 1px solid ${props => props.theme.colors.grey};
  display: flex;
  justify-content: left;
  align-items: center;
  width: 250px;
  height: 35px;
  line-height: 30px;
  margin-top: 10px;
  padding-left: 30px;
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
  & :first-of-type {
    margin-right: 15px;
  }
  & button {
    font-size: 18px;
  }
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
  // 내눈이 편안하기위한 마진탑 임. 반박시 니말이맞음
  margin-top: 12px;
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
