import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { useResetRecoilState } from 'recoil';

import { User } from 'types';
import { userState } from 'recoil/atom';

export const useGetCurrentUser = (): User | null => {
  const [cookies] = useCookies();
  if (!cookies.token || cookies.token === '') {
    return null;
  }
  const token = cookies.token;
  try {
    const user: User = jwt_decode(token);
    return user;
  } catch (err) {
    return null;
  }
};

export const useRemoveCurrentUser = (): (() => void) => {
  const [, , removeCookie] = useCookies();
  const resetUser = useResetRecoilState(userState);
  const signout = (): void => {
    removeCookie('token');
    resetUser();
  };

  return signout;
};
