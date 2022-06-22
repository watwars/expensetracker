import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import AuthRequired from './AuthRequired';
import * as urls from 'constants/urlConstants';
import { userState } from 'recoil/atom';
import { useGetCurrentUser } from 'utils/hooks';

import AuthForm from 'pages/Auth/AuthForm';
import DashboardPage from 'pages/Dashboard/DashboardPage';

const RouteSwitch = () => {
  const user = useGetCurrentUser();
  const setUser = useSetRecoilState(userState);
  if (user) {
    setUser(user);
  }
  return (
    <Routes>
      <Route index element={<>Landing</>} />
      <Route path={urls.signinRoute} element={<AuthForm page="LOGIN" />} />
      <Route path={urls.signupRoute} element={<AuthForm page="SIGNUP" />} />
      <Route
        path={urls.dashboardRoute}
        element={
          <AuthRequired>
            <DashboardPage />
          </AuthRequired>
        }
      />
    </Routes>
  );
};

export default RouteSwitch;
