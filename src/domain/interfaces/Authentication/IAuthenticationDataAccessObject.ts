import { RowDataPacket } from "mysql2/promise";

interface IAuthenticationDataAccessObject {
    findByEmail (email: string): Promise<RowDataPacket | null>;
}

export default IAuthenticationDataAccessObject;