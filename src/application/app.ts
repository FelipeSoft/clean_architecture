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

    public initializePool(): void {
        try {
            this.pool = mysql2.createPool({
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                host: process.env.DB_HOST
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
}

export default App;
