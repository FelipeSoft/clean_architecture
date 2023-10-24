import express from 'express';
import cors from 'cors';
import { userRouter } from '../src/application/modules/UserModule';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter.getRoutes());

export { app };
