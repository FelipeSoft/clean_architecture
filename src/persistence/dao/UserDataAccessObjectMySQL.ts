import { Connection, RowDataPacket } from "mysql2/promise";
import User from "../../domain/entities/User";
import bcrypt from "bcrypt";
import IUserDataAccessObject from "../../domain/interfaces/IUserDataAccessObject";
import Database from "../../config";
        
class UserDataAccessObjectSQL implements IUserDataAccessObject{
    private connection: Connection;

    public constructor() {
        const database = new Database();
        this.connection = database.getConnection();
    }

    public async all(): Promise<RowDataPacket | null> {
        try {
            const query = "SELECT * FROM users;";
            const [rows] = await this.connection.query(query);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows as RowDataPacket;
            }

            return null;
        } catch (error) {
            throw new Error("Data Access Object Error: " + error);
        } finally {
            this
        }
    }

    public async find(id: number): Promise<RowDataPacket | null> {
        try {
            const query = "SELECT * FROM users WHERE id = ?;";
            const [rows] = await this.connection.query(query, [id]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows as RowDataPacket;
            }

            return null;
        } catch (error) {
            throw new Error("Data Access Object Error: " + error);
        } finally {
            this
        }
    }

    public async create(user: User): Promise<void> {
        try {
            const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);";
            const params = [user.id, user.name, user.email, user.password ? await bcrypt.hash(user.password, 10) : null];

            await this.connection.query(query, params);
        } catch (error) {
            throw new Error ("Data Access Object Error: " + error)
        } finally {
            this
        }
    }

    public async update(user: User): Promise<void> {
        try {
            let query = "UPDATE users SET ";

            const properties = {
                names: ["_id", "_name", "_email", "_password"],
                values:  [user.id, user.name, user.email, user.password ? await bcrypt.hash(user.password, 10) : null]
            }

            for(let i = 1; i < properties.names.length; i++) {
                let key = properties.names[i] as keyof User[keyof User];

                if (user[key] !== null) {
                    query += `${properties.names[i].slice(1)} = "${properties.values[i]}", `
                }
            }

            query = query.substring(0, query.length - 2) + " WHERE id = ?;";
            await this.connection.query(query, properties.values[0]);
        } catch (error) {
            throw new Error("Data Access Object Error: " + error);
        } finally {
            this
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const query = "DELETE FROM users WHERE id = ?;";
            await this.connection.query(query, [id]);
        } catch (error) {
            throw new Error("Data Access Object Error: " + error);
        } finally {
            this
        }
    }
}

export default UserDataAccessObjectSQL;