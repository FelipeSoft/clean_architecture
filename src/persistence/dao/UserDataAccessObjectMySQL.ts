import { Connection, Pool, RowDataPacket } from "mysql2/promise";
import User from "../../domain/entities/User";
import bcrypt from "bcrypt";
import IUserDataAccessObject from "../../domain/interfaces/User/IUserDataAccessObject";

class UserDataAccessObjectSQL implements IUserDataAccessObject {
    public constructor(private readonly connection: Connection) { }

    public async findByEmail(email: string): Promise<any> {
        try {
            const query = "SELECT * FROM users WHERE email = ?;";
            const [rows] = await this.connection.query(query, [email]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows as RowDataPacket;
            }

            return null;
        } catch (error) {
            throw new Error("UserDAO Error[SQL] " + error);
        }
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
            throw new Error("UserDAO Error[SQL] " + error);
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
            throw new Error("UserDAO Error[SQL] " + error);
        }
    }

    public async create(user: User): Promise<void> {
        try {
            const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?);";
            const params = [
                user.id,
                user.name,
                user.email,
                user.password ? await bcrypt.hash(user.password, 10) : null
            ];

            await this.connection.query(query, params);
        } catch (error) {
            throw new Error("UserDAO Error[SQL] " + error)
        }
    }

    public async update(user: User): Promise<void> {
        try {
            let query = "UPDATE users SET name = ?, email = ?, password= ? WHERE ID = ?";
            await this.connection.query(query, [
                user.name,
                user.email, 
                user.password, 
                user.id
            ]);
        } catch (error) {
            throw new Error("UserDAO Error[SQL] " + error);
        }
    }

    public async delete(id: number): Promise<void> {
        try {
            const query = "DELETE FROM users WHERE id = ?;";
            await this.connection.query(query, [id]);
        } catch (error) {
            throw new Error("UserDAO Error[SQL] " + error);
        }
    }
}

export default UserDataAccessObjectSQL;