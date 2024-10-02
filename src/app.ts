import express, { Request, Response } from 'express';
const app = express();

app.get('/', (req: Request, res: Response) => {
  res.json('Travel Tips Server is running!');
});

export default app;
