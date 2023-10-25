import { Router, Request, Response } from "express";
import IRouter from "../../domain/interfaces/IRouter";
import AuthenticationController from "../controllers/AuthenticationController";

class AuthenticationRouter implements IRouter {
    public constructor (
        private readonly AuthenticationController: AuthenticationController,
        private readonly router: Router,
    ) {
        this.init();
    }
    
    public init(): void {
        this.router.post("/authentication/login", (request: Request, response: Response) => this.AuthenticationController.login(request, response));
    }
    
    public getRoutes(): Router {
        return this.router;
    } 
}

export default AuthenticationRouter;