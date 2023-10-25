import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/User/IUserRepository";

class UpdateUser {
    public constructor(private readonly UserRepository: IUserRepository) {}

    public async execute(user: User): Promise<void> {
        if(!Number.isInteger(user.getId()) && user.getId() < 0) {
            throw new UserIdInvalidError("User Error: Invalid ID field");
        }

        const updatedUser = new User();
        const entries = Object.entries(user);

        for (let i = 0; i < entries.length; i++) {
            let key = entries[i][0] as keyof User;
            let value = entries[i][1] as keyof User[keyof User];

            if (value !== null) {
                updatedUser[key] = value;
            }
        }

        await this.UserRepository.updateUser(updatedUser);
    }
}

export default UpdateUser;