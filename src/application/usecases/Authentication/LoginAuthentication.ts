import IAuthenticationRepository from "../../../domain/interfaces/Authentication/IAuthenticationRepository";
import bcrypt from "bcrypt";

class LoginAuthentication {
    public constructor (private readonly AuthenticationRepository: IAuthenticationRepository) {}

    public async execute(email: string, password: string): Promise<boolean> {
        const credentials = await this.AuthenticationRepository.getAccessorByEmail(email);

        if(credentials) {
            const passwordEncryptedFromDatabase = credentials.recoverPassword();
            const isRightCredentials = await bcrypt.compare(password, passwordEncryptedFromDatabase)

            return isRightCredentials;
        }

        return false;
    }
}

export default LoginAuthentication;

