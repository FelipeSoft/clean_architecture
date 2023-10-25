import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserIdInvalidError from "../../errors/User/UserIdInvalidError";
import UserIdMissingError from "../../errors/User/UserIdMissingError";

class DeleteUser {
    public constructor(private readonly UserRepository: IUserRepository) {}

    public async execute(id: number): Promise<void> { 
        if (!id) {
            throw new UserIdMissingError("User Error: Missing id field.");
        }    

        if (!Number.isInteger(id) || id <= 0) {
            throw new UserIdInvalidError("User Error: Invalid user id field.")
        }
        
        await this.UserRepository.deleteUser(id);
    }
}

export default DeleteUser;