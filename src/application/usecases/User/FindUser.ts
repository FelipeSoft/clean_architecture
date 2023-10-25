import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserIdMissingError from "../../errors/User/UserIdMissingError";
import UserNotFoundError from "../../errors/User/UserNotFoundError";

class FindUser {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async execute(id: number): Promise<User> {
        if (!id) {
            throw new UserIdMissingError("User Error: Missing id field.");
        }

        if (!Number.isInteger(id) && id <= 0) {
            throw new UserIdInvalidError("User Error: Invalid user id field.");
        }

        const userFromDatabase = await this.userRepository.getUserById(id);

        if(userFromDatabase === null) {
            throw new UserNotFoundError("User Error: Cannot find user with id " + id + ".");
        }
        
        return userFromDatabase;
    }
}   

export default FindUser;