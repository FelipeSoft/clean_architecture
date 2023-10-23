import User from "../../../domain/entities/User";
import IUserRepository from "../../../domain/interfaces/IUserRepository";
import GenerateEmail from "./GenerateEmail";

class CreateUser {
    public constructor(private readonly UserRepository: IUserRepository) {}

    public async execute(user: User): Promise<void | null> {
        if (user.name && user.password) {
            const generatedEmail = new GenerateEmail(this.UserRepository);

            const newUser = new User();
    
            newUser.name = user.name;
            newUser.email = generatedEmail.execute(user.name);
            newUser.password = user.password;
            
            await this.UserRepository.createUser(user);
            return;
        }

        return null;
    }
}

export default CreateUser;