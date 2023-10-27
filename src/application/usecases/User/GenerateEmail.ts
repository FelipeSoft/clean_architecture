import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserNotFoundError from "../../errors/User/UserNotFoundError";

class GenerateEmail {
    public constructor (private readonly userRepository: IUserRepository) {}

    public async execute(name: string, email: string): Promise<string> {
        let randomNumber = Math.floor(Math.random() * 2);
        let generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
        const userFromDatabase = await this.userRepository.getUserByEmail(email);

        if (userFromDatabase) {
            const emailFromDatabase = userFromDatabase.email;
            while (generatedEmail === emailFromDatabase) {
                randomNumber = Math.floor(Math.random() * 1000);
                generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
            }
            return generatedEmail;
        } else {
            throw new UserNotFoundError("User Error: Cannot find user with ID.");
        }
    }
}

export default GenerateEmail;