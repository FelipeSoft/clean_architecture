import mysql2, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

class Database {
    private connection: Connection;

    public constructor() {
        dotenv.config();

        this.connection = mysql2.createPool({
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
        });

        console.log("Connected with MySQL");
    }

    public getConnection(): Connection {
        return this.connection;
    }

    public async closeConnection(): Promise<void> {
        await this.connection.end();
        console.log("MySQL connection closed");
    }
}

export default Database;
