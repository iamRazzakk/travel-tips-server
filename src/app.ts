import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Routers } from './routes';
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use('/api/v1', Routers);
app.get('/', (req: Request, res: Response) => {
  res.json('🚀 Travel Tips Server is running!');
});

export default app;
