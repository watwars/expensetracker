import React from 'react';
import { useRecoilState } from 'recoil';
import { AppBar, Box, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { userState } from 'recoil/atom';

const Navbar = () => {
  const [user] = useRecoilState(userState);
  return (
    <AppBar>
      <Box display="flex" justifyContent="space-between" p={5}>
        <Typography variant="h3">EasyBudget</Typography>
        <div>
          <Typography variant="h5">Welcome, {user?.username}</Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Box>
    </AppBar>
  );
};

export default Navbar;
