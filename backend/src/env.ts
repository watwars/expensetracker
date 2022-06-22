// import { ProcessEnv } from 'NodeJs';
import * as dotenv from 'dotenv';
dotenv.config();

const envVariables = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  ENV: process.env.ENV,
};

export { envVariables };
