import React from 'react';

import { Box, Button, Typography } from '@mui/material';
import Navbar from 'components/Navbar/Navbar';

import { useRemoveCurrentUser } from 'utils/hooks';

const DashboardPage = () => {
  const signout = useRemoveCurrentUser();

  return (
    <Box>
      <Navbar />
      <Typography>Dashboard</Typography>
      <Button onClick={signout}>Sign Out</Button>
    </Box>
  );
};

export default DashboardPage;
