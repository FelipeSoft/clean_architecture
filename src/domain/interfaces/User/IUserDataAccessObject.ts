import { RowDataPacket } from "mysql2/promise";
import User from "../../entities/User";

export default interface IUserDataAccessObject {
    findByEmail(email: string): Promise<any | null>;

    all(): Promise<RowDataPacket[] | RowDataPacket | null>;

    find(id: number): Promise<RowDataPacket | null>; 

    create(user: User): Promise<void>; 

    update(user: User): Promise<void>; 

    delete(id: number): Promise<void>;
}