import bcrypt from "bcrypt";
import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/User/IUserRepository";
import UserCredentialsMissingError from "../../errors/User/UserCredentialsMissingError";
import GenerateEmail from "./GenerateEmail";

class CreateUser {
    public constructor(private readonly UserRepository: IUserRepository) { }

    public async execute(user: User): Promise<void> {
        if (!user.name || !user.password || !user.email) {
            throw new UserCredentialsMissingError("User Error: Missing credentials of user.");
        }

        const generateEmailUseCase = new GenerateEmail(this.UserRepository);
        const generatedEmail = await generateEmailUseCase.execute(user.name, user.email);
        const encryptedPassword = await bcrypt.hash(user.password, 10);

        const newUser = new User(user.name, generatedEmail, encryptedPassword);

        await this.UserRepository.createUser(newUser);
    }
}

export default CreateUser;