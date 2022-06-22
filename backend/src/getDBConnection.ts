import { Pool } from 'pg';

import { envVariables } from './env';

const connectionString = envVariables.DATABASE_URL;
const pool = new Pool({ connectionString });

const getClient = async () => {
  try {
    const client = await pool.connect();
    return client;
  } catch (err) {
    throw err;
  }
};

export { getClient };
