import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/User/IUserRepository";

class GetAllUsers {
    public constructor (private readonly UserRepository: IUserRepository) {}

    public async execute(): Promise<User | User[] | null> {
        const userRepository = await this.UserRepository.getAllUsers();
        return userRepository !== null ? userRepository : null;
    }
}

export default GetAllUsers;