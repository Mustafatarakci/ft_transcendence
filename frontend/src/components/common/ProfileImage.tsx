import React from 'react';
import styled from '@emotion/styled';

interface ProfileImageProps {
  src: string;
  size: number;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ src, size }) => {
  return (
    <ProfileImageContainer size={size}>
      <ProfileImageImg src={src} alt="ProfileImage" />
    </ProfileImageContainer>
  );
};

const ProfileImageContainer = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grey};
  overflow: hidden;
`;

const ProfileImageImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default ProfileImage;
