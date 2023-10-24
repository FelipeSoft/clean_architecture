import mysql2, { Connection } from "mysql2/promise";
import dotenv from "dotenv";

class Database {
    private connection: Connection;

    public constructor() {
        dotenv.config();

        this.connection = mysql2.createPool({
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
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
