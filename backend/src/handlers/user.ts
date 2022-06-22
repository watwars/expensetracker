import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { getClient } from '../getDBConnection';
import { CreateUserRequest, ErrorResponse, User } from '../types';
import { envVariables } from '../env';

const jwtMaxAge = 3600 * 24; // 1 day

const jwtSignUser = (user: User) => {
  const { user_id, username, email } = user;
  return jwt.sign({ user_id, username, email }, envVariables.JWT_SECRET, {
    expiresIn: jwtMaxAge,
  });
};

export const createUser = async (user: CreateUserRequest) => {
  const { user_id, username, email, password } = user;
  const query =
    'INSERT INTO users (user_id, username, email, user_password) VALUES ($1, $2, $3, $4)';
  const values = [user_id, username, email, password];
  const client = await getClient();

  try {
    await client.query(query, values);
    const jwtToken = jwtSignUser({
      user_id,
      username,
      email,
      user_password: password,
    });
    return {
      isSuccess: true,
      message: 'User created successfully',
      token: jwtToken,
    };
  } catch (err) {
    return { isSuccess: false, message: err, token: '' };
  }
};

export const deleteUserByID = async (user_id: string) => {
  const query = 'DELETE FROM users WHERE user_id = $1';
  const values = [user_id];
  const client = await getClient();

  try {
    await client.query(query, values);
    return { isSuccess: true, message: 'User deleted successfully' };
  } catch (err) {
    return { isSuccess: false, message: err };
  }
};

export const signinUser = async (username: string, password: string) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const client = await getClient();

  try {
    const result = await client.query(query, values);
    const rows = result.rows;

    if (rows.length === 0) {
      throw new Error('ExpenseTracker error: User not found');
    }

    const user: User = rows[0];
    const hashedPassword: string = user.user_password;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new Error('ExpenseTracker error: Invalid credentials');
    }

    const token = jwtSignUser(user);

    return {
      isSuccess: true,
      message: 'User signed in successfully',
      user,
      token,
    };
  } catch (err: ErrorResponse | any) {
    return { isSuccess: false, message: err.message, user: null, token: '' };
  }
};
