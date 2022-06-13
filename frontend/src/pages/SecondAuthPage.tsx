import React, { useState } from 'react';
import styled from '@emotion/styled';

/*
 ** import Button from '../components/common/Button';
 ** FE-dev가 갱신되면 땡겨와서 수정예정입니다.
 */

/*
 ** axios도 나중엔 하나로 합쳐질 예정입니다.
 */
import axios from 'axios';

/*
 ** 임시적인 테스트이기 때문에, 폼에들어가는 프로퍼티는 작성하지 않았습니다.
 ** 회의내용에 따라, form tag 사용안할수도 있습니다.
 */
const SecondAuthPage: React.FC = () => {
  /* 인증코드 저장용 useState*/
  const [title, setTitle] = useState('');
  const [result, setResult] = useState('');

  /*
   ** 지금여기서 subtext에 표시할 내용을 갱신해주고 있는데.. 그러면 중복상황에서 혼란이 생길수있다.
   ** 인풋값에 대한 이벤트가 발생할때마다. subtext에 대한 내용이 갱신되도록 수정해야한다.
   ** 성공 또는 실패에 맞게 then, catch로. 이후 항상실행
   */
  const onCheck = (event: any) => {
    event.preventDefault();
    axios
      .get(`http://localhost:4000/posts/${2}`)
      .then(function (response) {
        if (title === response.data.authCode) {
          setResult('');
          alert(`안녕하세요 ${response.data.user}!`);
        } else setResult('코드가 일치하지 않습니다');
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  /*
   ** 제이슨서버 id:2에 유저정보및 인증코드가 들어있다고 가정하고
   ** axios로 값을 요청합니다.
   ** 성공 또는 실패에 맞게 then, catch로.
   */
  const onGetQuery = () => {
    axios
      .get(`http://localhost:4000/posts/${2}`)
      .then(function (response) {
        alert('인증코드 : ' + response.data.authCode);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };
  /*
   ** 서버에 정보를 갱신할때 테스트.
   ** 성공 또는 실패에 맞게 then, catch로.
   */
  const onPost = () => {
    axios
      .post('http://localhost:4000/posts/', {
        id: 1,
        // id && password.. 같은값을 줘서 갱신할수도있나보다.
        name: 'dskfjls',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  /*
   ** 서버에 정보를 삭제할때 테스트.
   ** 성공 또는 실패에 맞게 then, catch로.
   */
  const onDelete = () => {
    axios
      .delete('http://localhost:4000/posts/', {
        params: {
          id: 3,
        },
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  /*
   ** 서버에 정보를 수정할때 테스트
   ** 성공 또는 실패에 맞게 then, catch로.
   */
  const onPatch = () => {
    axios
      .patch(`http://localhost:4000/posts/${3}`, {
        name: '수정할순있어요',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Wrap>
      <LoginBox>
        <MainText>등록된 이메일로 받은 코드를 입력해 주세요</MainText>
        <form onSubmit={onCheck}>
          <Input
            className="input"
            placeholder="인증코드를 입력하세요"
            type="text"
            onChange={event => {
              setTitle(event.target.value);
              setResult('');
              console.log({ title });
            }}
            required
          />
          <SubText>{result}</SubText>
          <ButtonBox>
            <Button type="button" value="코드 재전송" onClick={onGetQuery}></Button>
            <Button type="submit" value="확인"></Button>
          </ButtonBox>
        </form>
      </LoginBox>
    </Wrap>
  );
};
//<Button onClick={() => alert('코드를 재전송하는 함수작성할것')}>코드 재전송</Button>

/*
 ** 중앙정렬할 자식태그를 위해서 부모태그의 높이를 전체로 수정했습니다.
 ** 그후 block인 div의 속성을 flex키워드로 바꿔주고 'justify-content' & 'align-items'로 정렬해줍니다.
 */
const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/*
 ** 로그인 2차인증을 위한 창을 표시할건데여..
 ** border, border-radius로 외곽선을 맞춰주고요.
 ** width랑 height은 자식으로부터 범위재지정이 이루어지고
 ** text-align으로 내부 문자를 중앙정렬해줍니다.(center)
 ** display 속성을 flex로 바꿔주면, 자식태그가 가로로 배치가 되는데
 ** 이것을 flex-direction으로 세로로 바꿔준후에!
 ** justify-content로 중앙정렬해주면 대칭이 맞게됩니다.
 */
const LoginBox = styled.div`
  border: 2px solid ${props => props.theme.colors.main};
  border-radius: 20px;
  min-width: 587px;
  width: 587px;
  height: 367px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

/*
 ** main이 될 텍스트 표시합니다 (등록된 이메일로 받은 코드를 입력해 주세요)
 ** 양쪽 마진을 같게 남기겠다. 근데 div는 기본이 100%라서 자식위드가 있어야 한다......
 ** 만약 마진값이 있으면,, 순서대로 0위아래, 오토는 좌우.를 의미한다.. 니까..
 */
const MainText = styled.div`
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 60px;
  font-weight: bold;
  color: ${props => props.theme.colors.main};
`;

/*
 ** 그다음은 인풋창에대한 스타일을 설정합니다.
 ** boder를 지워버리고 border-bottom만 사용해서 언더바로 스타일링했습니다.
 ** 피그마의 인스펙트와 같게 width를 줬습니다. height는 임의값입니다.
 */
const Input = styled.input`
  text-align: center;
  font-size: 14px;
  border: none;
  border-bottom: 1px solid #000;
  width: 256px;
  height: 40px;
  outline: none;
`;

/*
 ** 그다음은 서브텍스트 스타일링입니다.
 ** "코드가 일치하지 않습니다" 라는 문구를 임시적으로 스타일링 해뒀습니다.
 ** 안쪽 패딩값을 통해서, 비율을 맞춰줬습니다.
 ** (다현님 피드백에 따라 p태그로 바꿨습니다)
 ** SubText의 패딩값으로 정렬하지말고, 마진값으로 정렬했습니다.
 ** padding: 40px 0; -> margin: 10px 0;
 */
const SubText = styled.p`
  margin: 10px 0;
  color: ${props => props.theme.colors.red};
  font-family: 'Roboto';
  font-style: normal;
  font-size: 14px;
  height: 14px;
`;
//line-height 얘는 높이에서 중심을 맞추려고 할때 필요하다! (일단보류)

/*
 ** &(자식)에 대한 여러가지 스타일링을 지정할겁니다.
 ** 첫번째 자식에 오른쪽에 마진을 줘서 간격을 조정하고
 ** 자식 모두 호버를 줘서 입체적인느낌을 표현....ㅋ 했지만.
 ** 합의가 안된부분이라 나중에 다시 생각해보는걸로 하자.
 ** 마진라이트를 음수로 줘서.. 아냐 일단 빼자..margin-right: -100px;
 */
const ButtonBox = styled.div`
  & :first-of-type {
    margin-right: 19px;
  }
  & :hover {
    background-color: ${props => props.theme.colors.main};
    color: ${props => props.theme.colors.white};
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

/*
 ** 마지막으로 버튼을 스타일링 할건데
 ** 기본적인거는 피그마보고 처리고,, 정렬만 해주면 되겠다. 백그라운드컬러는 일단 없게해놓자 ..
 */
//<Button>버튼1</Button>
//<Button>버튼2</Button>
const Button = styled.input`
  border: 1px solid ${props => props.theme.colors.main};
  width: 130px;
  height: 30px;
  border-radius: 5px;
  text-align: center;
  background-color: transparent;
  font-family: 'Roboto';
  font-style: normal;
  font-size: 18px;
`;

export default SecondAuthPage;
