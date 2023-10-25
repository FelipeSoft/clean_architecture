import IAuthenticationRepository from "../../domain/interfaces/Authentication/IAuthenticationRepository";
import IAuthenticationDataAccessObject from "../../domain/interfaces/Authentication/IAuthenticationDataAccessObject";

class AuthenticationRepository implements IAuthenticationRepository {
    public constructor (private readonly AuthenticationDataAccessObject: IAuthenticationDataAccessObject) {}

    public async getAccessorByEmail(email: string): Promise<Authentication | null> {
        const credentialsFromDatabase = await this.AuthenticationDataAccessObject.findByEmail(email);
        
        if(Array.isArray(credentialsFromDatabase) && credentialsFromDatabase.length > 0) {
            const only = credentialsFromDatabase[0];
            const credentials: Credentials = {
                email: only.email,
                password: only.password
            }

            const authentication = new Authentication(credentials);
            return authentication;
        }

        return null;
    }
}

export default AuthenticationRepository;