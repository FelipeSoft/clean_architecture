import mysql, { Connection, createPool } from "mysql2/promise";

class Database {
  private connection: Connection;

  public constructor() {
    this.connection = createPool({
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    });

    console.log("Connected with MySQL")
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
