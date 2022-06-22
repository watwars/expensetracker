import express from 'express';
import cors from 'cors';

import { userRoutes } from './routes';

import { envVariables } from './env';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = envVariables.PORT || 5000;

app.get('/', (_, res) => res.send('OKAY'));
app.use('/api/users', userRoutes);
app.get('*', (_, res) => res.send('Invalid endpoint'));
app.post('*', (_, res) => res.send('Invalid endpoint'));

app.listen(PORT, () =>
  console.log(`APP RUNNING AND LISTENING ON PORT ${PORT}`)
);
