import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserNotFoundError from "../../errors/User/UserNotFoundError";

class GetAllUsers {
    public constructor (private readonly userRepository: IUserRepository) {}

    public async execute(): Promise<User | User[]> {
        const user = await this.userRepository.getAllUsers();

        if(user === null) {
            throw new UserNotFoundError("Cannot find users on database.")
        }

        return user;
    }
}

export default GetAllUsers;