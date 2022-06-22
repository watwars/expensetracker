import React from 'react';

import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie';

import { User } from 'types';
import { hashPassword } from 'utils/utils';
import { signUp } from 'api/auth';
import { dashboardRoute, signinRoute } from 'constants/urlConstants';

interface FormFields {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email().required('Email is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string().required('Password is required').min(6).max(20),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const initialValues: FormFields = {
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
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

const SignupForm = () => {
  const setCookie = useCookies()[1];
  const navigate = useNavigate();

  const onSubmit = async (values: FormFields) => {
    const hashedPassword = await hashPassword(values.password);
    const user: User = {
      user_id: uuidv4(),
      email: values.email,
      username: values.username,
      user_password: hashedPassword,
    };
    const response = await signUp(user);
    if (response !== null) {
      setCookie('token', response.token, { path: '/' });
      setTimeout(() => navigate(dashboardRoute, { replace: true }), 300);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const fields = {
    email: {
      label: 'Email',
      name: 'email',
      type: 'email',
      value: formik.values.email,
      error: formik.errors.email && Boolean(formik.errors.email),
      onChange: formik.handleChange,
      helperText: formik.touched.email && formik.errors.email,
      fullWidth: true,
    },
    username: {
      label: 'Username',
      name: 'username',
      value: formik.values.username,
      error: formik.errors.username && Boolean(formik.errors.username),
      onChange: formik.handleChange,
      helperText: formik.touched.username && formik.errors.username,
      fullWidth: true,
    },
    password: {
      label: 'Password',
      name: 'password',
      type: 'password',
      value: formik.values.password,
      error: formik.errors.password && Boolean(formik.errors.password),
      onChange: formik.handleChange,
      helperText: formik.touched.password && formik.errors.password,
      fullWidth: true,
    },
    confirmPassword: {
      label: 'Confirm Password',
      name: 'confirmPassword',
      type: 'password',
      value: formik.values.confirmPassword,
      error:
        formik.errors.confirmPassword && Boolean(formik.errors.confirmPassword),
      onChange: formik.handleChange,
      helperText:
        formik.touched.confirmPassword && formik.errors.confirmPassword,
      fullWidth: true,
    },
  };

  return (
    <Box style={styles.container}>
      <Box mb={3} mt={1} ml={2} mr={2}>
        <Typography variant="h4">Create your EasyBudget account.</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField {...fields.email} />
          </Grid>
          <Grid item>
            <TextField {...fields.username} />
          </Grid>
          <Grid item>
            <TextField {...fields.password} />
          </Grid>
          <Grid item>
            <TextField {...fields.confirmPassword} />
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" fullWidth>
              Create Account
            </Button>
          </Grid>
        </Grid>
      </form>
      <Box mt={2}>
        <Typography variant="subtitle1">
          Already have an account? <Link to={signinRoute}>Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
