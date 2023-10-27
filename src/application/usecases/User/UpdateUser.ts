import User from "../../../domain/entities/User";
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

        const properties = {
            names: ["name", "email", "password"],

            values: [
                user.name,
                user.email,
                user.password
            ]
        }

        const userFromDatabase = await this.userRepository.getUserById(user.id);

        if (userFromDatabase) {
            const updatedUser = new User(
                userFromDatabase.name, 
                userFromDatabase.email, 
                userFromDatabase.password, 
                userFromDatabase.id
            );

            await this.userRepository.updateUser(updatedUser);
        } else {
            throw new UserNotFoundError("Cannot find user with ID " + user.id + ".");
        }

    }
}

export default UpdateUser;