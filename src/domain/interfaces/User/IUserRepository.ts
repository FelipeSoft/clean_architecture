import UserDTO from "../../../persistence/dto/UserDTO";
import User from "../../../persistence/dto/UserDTO";

export default interface IUserRepository {
    getAllUsers(): Promise<User[] | User | null>;

    getUserById(id: number): Promise<User | null>; 

    createUser(user: User): Promise<void>; 

    updateUser(user: Partial<User>): Promise<void>; 

    deleteUser(id: number): Promise<void>;
}