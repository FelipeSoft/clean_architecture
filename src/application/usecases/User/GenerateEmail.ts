import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserNotFoundError from "../../errors/User/UserNotFoundError";

class GenerateEmail {
    public constructor (private readonly userRepository: IUserRepository) {}

    public async execute(id: number, name: string): Promise<string> {
        let randomNumber = Math.floor(Math.random() * 2);
        let generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
        const userFromDatabase = await this.userRepository.getUserById(id);

        if (userFromDatabase) {
            const emailFromDatabase = userFromDatabase.getEmail();
            while (generatedEmail === emailFromDatabase) {
                randomNumber = Math.floor(Math.random() * 1000);
                generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
            }
            return generatedEmail;
        } else {
            throw new UserNotFoundError("User Error: Cannot find user with ID " + id);
        }
    }
}

export default GenerateEmail;