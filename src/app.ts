import express, { Request, Response, json } from 'express';
import dotenv from 'dotenv';
import { urlencoded } from 'body-parser';
dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

app.use(urlencoded({ extended: true }));
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});