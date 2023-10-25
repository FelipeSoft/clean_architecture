import { Response, Request } from "express";
import LoginAuthentication from "../usecases/Authentication/LoginAuthentication";

class AuthenticationController {
    public constructor (
        private readonly LoginAuthentication: LoginAuthentication
    ) {}

    public async login(request: Request, response: Response): Promise<Response> {
        return response.send("Hello!");
    }
}


export default AuthenticationController;