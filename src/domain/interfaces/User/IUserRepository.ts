import User from "../../entities/User";

export default interface IUserRepository {
    getAllUsers(): Promise<User[] | User | null>;

    getUserById(id: number): Promise<User | null>; 

    getUserByEmail(email: string): Promise<User | null>;

    createUser(user: User): Promise<void>; 

    updateUser(user: User): Promise<void>; 

    deleteUser(id: number): Promise<void>;
}