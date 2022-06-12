import React, { createContext, useState } from 'react';
import { LOGIN, LOGOUT, SECOND_AUTH, SET_NICKNAME, User, UserStateType } from '../utils/interface';

export const AllContext = createContext<stateType>({
  modalData: {
    isModal: false,
    setIsModal: () => null,
  },
  userData: {
    user: null,
    setUser: () => null,
  },
  userStatus: {
    userStatus: LOGOUT,
    setUserStatus: () => null,
  },
});

type stateType = {
  modalData: {
    isModal: boolean;
    setIsModal: () => void;
  };
  userData: {
    user: User | null;
    setUser: (type: string, user?: User) => void;
  };
  userStatus: {
    userStatus: UserStateType;
    setUserStatus: (type: UserStateType) => void;
  };
};

interface AllContextApiProps {
  children: React.ReactNode;
}

const AllContextApi = ({ children }: AllContextApiProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserState] = useState<UserStateType>(LOGOUT);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  const handleUser = (type: string, user?: User) => {
    switch (type) {
      case 'login':
        if (user) {
          setUser(user);
          if (!user.nickname) {
            setUserState(SET_NICKNAME);
          } else if (user.secondAuth) {
            setUserState(SECOND_AUTH);
          } else {
            setUserState(LOGIN);
          }
        }
        return;
      case 'logout':
        setUser(null);
        return;
      default:
        return;
    }
  };

  const handleUserStatus = (type: UserStateType) => {
    setUserState(type);
  };

  const data = {
    modalData: {
      isModal,
      setIsModal: handleModal,
    },
    userData: {
      user,
      setUser: handleUser,
    },
    userStatus: {
      userStatus,
      setUserStatus: handleUserStatus,
    },
  };
  return <AllContext.Provider value={data}>{children}</AllContext.Provider>;
};

export { AllContextApi };
