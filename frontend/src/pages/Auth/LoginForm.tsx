import React from 'react';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useCookies } from 'react-cookie';

import { hashPassword } from 'utils/utils';
import { signIn } from 'api/auth';
import { dashboardRoute, signupRoute } from 'constants/urlConstants';

interface FormFields {
  username: string;
  password: string;
}

const initialValues: FormFields = {
  username: '',
  password: '',
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    boxShadow: '0px 0px 30px #ccc',
    width: '350px',
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '0 auto',
  },
  form: {
    width: '100%',
    justifyContent: 'space-between',
  },
};

const LoginForm = () => {
  const setCookie = useCookies()[1];
  const navigate = useNavigate();

  const onSubmit = async (values: FormFields) => {
    const response = await signIn(values.username, values.password);
    if (response !== null) {
      setCookie('token', response.token, { path: '/' });
      setTimeout(() => navigate(dashboardRoute, { replace: true }), 300);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  const fields = {
    username: {
      label: 'Username',
      name: 'username',
      value: formik.values.username,
      onChange: formik.handleChange,
      fullWidth: true,
    },
    password: {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: formik.values.password,
      onChange: formik.handleChange,
      fullWidth: true,
    },
  };

  return (
    <Box style={styles.container}>
      <Box mb={3} mt={1} ml={2} mr={2}>
        <Typography variant="h4">Login to your EasyBudget account.</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField {...fields.username} />
          </Grid>
          <Grid item>
            <TextField {...fields.password} />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" fullWidth>
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={2}>
        <Typography variant="subtitle1">
          Do not have an account? <Link to={signupRoute}>Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
