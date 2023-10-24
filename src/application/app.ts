import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mysql2, { Pool } from "mysql2/promise";
import userRoutes from "./routes/userRoutes";

class App {
    public express: express.Application;
    public pool!: Pool;

    public constructor() {
        this.express = express();
        dotenv.config();
        this.middlewares();
    }

    private middlewares(): void {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(userRoutes);
    }

    public async initializePool(): Promise<void> {
        try {
            this.pool = mysql2.createPool({
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME,
                host: process.env.DATABASE_HOST
            });

            console.log("Connected with MySQL");
        } catch (error) {
            console.error("Error connecting to MySQL:", error);
            throw error;
        }
    }

    public getPool(): Pool {
        return this.pool;
    }

    public async start(): Promise<void> {
        await this.initializePool();
        this.listen();
    }

    private listen(): void {
        const port = process.env.PORT || 8080;
        this.express.listen(port, () => {
            console.log("The server is listening on port " + port);
        });
    }
}

export default App;
