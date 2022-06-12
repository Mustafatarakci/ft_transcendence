import React, { createContext, useState } from 'react';
import { LOGIN, LOGOUT, SECOND_AUTH, SET_NICKNAME, User, UserStateType } from '../utils/interface';

export const AllContext = createContext<stateType | null>(null);

type stateType = {
  modalData: {
    state: boolean;
    setState: () => void;
  };
  userData: {
    state: User | null;
    setState: (type: string, user?: User) => void;
  };
  userState: {
    state: UserStateType;
    setState: (type: UserStateType) => void;
  };
};

interface AllContextApiProps {
  children: React.ReactNode;
}

const AllContextApi = ({ children }: AllContextApiProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userState, setUserState] = useState<UserStateType>(LOGOUT);

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

  const handleUserState = (type: UserStateType) => {
    setUserState(type);
  };

  const data = {
    modalData: {
      state: isModal,
      setState: handleModal,
    },
    userData: {
      state: user,
      setState: handleUser,
    },
    userState: {
      state: userState,
      setState: handleUserState,
    },
  };
  return <AllContext.Provider value={data}>{children}</AllContext.Provider>;
};

export { AllContextApi };
