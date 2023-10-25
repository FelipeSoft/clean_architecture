import { Router } from "express";
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
        this.router.get("/authentication/login",(req, res) => this.AuthenticationController.login(req, res));
    }
    
    public getRoutes(): Router {
        return this.router;
    } 
}

export default AuthenticationRouter;