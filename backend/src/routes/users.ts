import express from 'express';

import { logger } from '../utils/logging';
import { CreateUserRequest, SignInRequest } from '../types';
import { createUser, signinUser } from '../handlers/user';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const requestBody: CreateUserRequest = req.body;
  logger.info('Create user request received: ', requestBody);
  const response = await createUser(requestBody);
  if (response.isSuccess) {
    res.status(200).json(response);
  } else {
    logger.error(response.message);
    res.status(400).json(response);
  }
});

router.post('/signin', async (req, res) => {
  const requestBody: SignInRequest = req.body;
  const { username, password } = requestBody;
  logger.info('Sign in request received: ', requestBody);
  const response = await signinUser(username, password);
  if (response.isSuccess) {
    res.status(200).json(response);
  } else {
    const { message } = response;
    if (message.includes('ExpenseTracker error:')) {
      logger.warn(message);
    } else {
      logger.error(message);
    }
    res.status(400).json(response);
  }
});

export default router;
