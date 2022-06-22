import React, { useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import authBackgroundImage from 'assets/authBackground.webp';
import BackgroundImage from 'components/Images/BackgroundImage';
import SignupForm from './SignupForm';
import LoginForm from 'pages/Auth/LoginForm';
import { useGetCurrentUser } from 'utils/hooks';
import { dashboardRoute } from 'constants/urlConstants';

type AuthPage = 'LOGIN' | 'SIGNUP';

interface AuthFormProps {
  page: AuthPage;
}

const AuthForm = ({ page }: AuthFormProps) => {
  const navigate = useNavigate();
  const currentUser = useGetCurrentUser();

  useEffect(() => {
    if (currentUser !== null) {
      navigate(dashboardRoute, { replace: true });
    }
  }, [currentUser, navigate]);

  return (
    <>
      <BackgroundImage src={authBackgroundImage} />
      <Box textAlign="center">
        <Box mt={3} mb={2}>
          <Typography variant="h2">EasyBudget</Typography>
        </Box>

        {page === 'SIGNUP' && <SignupForm />}

        {page === 'LOGIN' && <LoginForm />}
      </Box>
    </>
  );
};

export default AuthForm;
