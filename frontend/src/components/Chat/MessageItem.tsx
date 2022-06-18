import React from 'react';
import styled from '@emotion/styled';
import { IMessage } from '../../utils/interface';

interface MessageItemProps {
  message: IMessage;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  if (message.isBroadcast) return <BroadcastMsg>{message.message}</BroadcastMsg>;
  else
    return (
      <>
        {message.from && (
          <MessageItemContainer fromUser={message.fromUser}>
            {!message.fromUser && (
              <ProfileImgWrapper>
                <ProfilImage src={message.from.profileImage} alt="userProfilImg" />
              </ProfileImgWrapper>
            )}
            <MessageWrapper fromUser={message.fromUser}>
              {!message.fromUser && <MessageName>{message.from.nickname}</MessageName>}
              <MessageContent>
                <p>{message.message}</p>
              </MessageContent>
            </MessageWrapper>
          </MessageItemContainer>
        )}
      </>
    );
};

const BroadcastMsg = styled.span`
  display: inline-block;
  width: 100%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.deepGrey};
  text-align: center;
  font-size: 12px;
`;

const MessageItemContainer = styled.div<{ fromUser: boolean }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${props => (props.fromUser ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
`;
const ProfileImgWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
`;
const ProfilImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const MessageWrapper = styled.div<{ fromUser: boolean }>`
  text-align: ${props => (props.fromUser ? 'right' : 'left')};
  max-width: 70%;
`;
const MessageName = styled.span`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const MessageContent = styled.div`
  background-color: ${({ theme }) => theme.colors.grey};
  border-radius: 10px;
  padding: 10px 10px;
`;

export default MessageItem;
