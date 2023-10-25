import express from 'express';
import cors from 'cors';
import { userRouter } from '../src/application/modules/UserModule';
import { authenticationRouter } from '../src/application/modules/AuthenticationModule';

const app = express();

app.use(cors());
app.use(express.json());
app.use(userRouter.getRoutes());
app.use(authenticationRouter.getRoutes());

export { app };
