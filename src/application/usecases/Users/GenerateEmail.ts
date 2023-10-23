import IUserRepository from "../../../domain/interfaces/IUserRepository";

class GenerateEmail {
    public constructor (private readonly UserRepository: IUserRepository) {}

    public execute(name: string): string {
        let randomNumber = Math.floor(Math.random() * 2);
        let generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
        const emailFromDatabase = "felipe.castro1@mc.com.br";

        if (generatedEmail === emailFromDatabase) {
            do {
                randomNumber = Math.floor(Math.random() * 1000);
                generatedEmail = `${name}.me${randomNumber}@mc.com.br`;
            } while (generatedEmail !== emailFromDatabase);
        }

        return generatedEmail;
    }
}

export default GenerateEmail;