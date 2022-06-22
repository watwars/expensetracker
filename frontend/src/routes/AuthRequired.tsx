import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetCurrentUser } from 'utils/hooks';
import { signinRoute } from 'constants/urlConstants';

const AuthRequired = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const user = useGetCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate(signinRoute);
    }
  }, [user, navigate]);

  return <>{children}</>;
};

export default AuthRequired;
