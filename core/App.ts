import express, { json } from 'express';
import cors from 'cors';
import userRoutes from "../src/application/routers/userRoutes";
import authenticationRoutes from "../src/application/routers/authenticationRoutes";

class App {
    public express: express.Application;

    public constructor() {
        this.express = express();
        this.middlewares();
    }

    private middlewares(): void {
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(userRoutes);
        this.express.use(authenticationRoutes);
    }
}

export default App;
