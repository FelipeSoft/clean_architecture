import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/IUserRepository";

class FindUser {
    public constructor(private readonly UserRepository: IUserRepository) {}

    public async execute(id: number): Promise<User | null> {
        const userRepository = await this.UserRepository.getUserById(id);
        return userRepository !== null ? userRepository : null;
    }
}   

export default FindUser;