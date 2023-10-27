import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserDTO from "../../../persistence/dto/UserDTO";
import UserCredentialsMissingError from "../../errors/User/UserCredentialsMissingError";
import UserIdMissingError from "../../errors/User/UserIdMissingError";
import UserNotFoundError from "../../errors/User/UserNotFoundError";

class UpdateUser {
    public constructor(private readonly userRepository: IUserRepository) { }

    public async execute(user: UserDTO): Promise<void> {
        if (!user.id) {
            throw new UserIdMissingError("Missing field ID.");
        }

        if (!user.name || !user.email || !user.password) {
            throw new UserCredentialsMissingError("Few arguments to update. Expected at least 1 argument.");
        }

        const existingUser = await this.userRepository.getUserById(user.id);

        if (existingUser) {
            if (user.name) {
                existingUser.name = user.name;
            }

            if (user.email) {
                existingUser.email = user.email;
            }

            if (user.password) {
                existingUser.password = user.password;
            }

            await this.userRepository.updateUser(existingUser);
        } else {
            throw new UserNotFoundError("Cannot find user.");
        }
    }
}

export default UpdateUser;