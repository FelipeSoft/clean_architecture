import { RowDataPacket } from "mysql2";
import IAuthenticationDataAccessObject from "../../domain/interfaces/Authentication/IAuthenticationDataAccessObject";
import { Connection } from "mysql2/promise";

class AuthenticationDataAccessObjectMySQL implements IAuthenticationDataAccessObject {
    public constructor(private readonly connection: Connection) {}
    
    public async findByEmail(email: string): Promise<RowDataPacket | null> {
        try {
            const query = "SELECT email, password FROM users WHERE email = ?";
            const [rows] = await this.connection.query(query, [email]);

            if (Array.isArray(rows) && rows.length > 0) {
                return rows as RowDataPacket;
            }

            return null;
        } catch (error) {
            throw new Error("AuthenticationDAO Error: " + error);
        }
    }
}

export default AuthenticationDataAccessObjectMySQL;

