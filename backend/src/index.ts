import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:4200',
    credentials: true,
  })
);

app.use(express.json());
const PORT = env.port;

app.use(authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Bem-vindo a minha API com Express Node.JS' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
