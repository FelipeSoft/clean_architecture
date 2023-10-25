import { Connection, RowDataPacket } from "mysql2/promise";
import User from "../../domain/entities/User";
import bcrypt from "bcrypt";
import IUserDataAccessObject from "../../domain/interfaces/User/IUserDataAccessObject";
        
class UserDataAccessObjectSQL implements IUserDataAccessObject{
    public constructor(private readonly connection: Connection) {}

    public async all(): Promise<RowDataPacket | null> {
        try {
            const query = "SELECT * FROM users;";
            const [rows] = await this.connection.query(query);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows as RowDataPacket;
            }

            return null;
        } catch (error) {
            throw new Error("UserDAO Error: " + error);
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
            throw new Error("UserDAO Error: " + error);
        }
    }

    public async create(user: User): Promise<void> {
        try {
            const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);";
            const params = [
                user.getId(), 
                user.getName(), 
                user.getEmail(), 
                user.getPassword() ? await bcrypt.hash(user.getPassword(), 10) : null
            ];

            await this.connection.query(query, params);
        } catch (error) {
            throw new Error ("UserDAO Error: " + error)
        }
    }

    public async update(user: User): Promise<void> {
        try {
            let query = "UPDATE users SET ";

            const properties = {
                names: ["_id", "_name", "_email", "_password"],
                values:  [
                    user.getId(), 
                    user.getName(), 
                    user.getEmail(), 
                    user.getPassword() ? await bcrypt.hash(user.getPassword(), 10) : null
                ]
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
            throw new Error("UserDAO Error: " + error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const query = "DELETE FROM users WHERE id = ?;";
            await this.connection.query(query, [id]);
        } catch (error) {
            throw new Error("UserDAO Error: " + error);
        }
    }
}

export default UserDataAccessObjectSQL;