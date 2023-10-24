import { Request, Response, Router } from "express";
import IRouter from "../../domain/interfaces/IRouter";
import UserController from "../controllers/UserController";

class UserRouter implements IRouter {
    public constructor(private readonly UserController: UserController, private readonly router: Router) {
        this.init();
    }

    public init(): void {
        this.router.get("/users/all", (request: Request, response: Response) => {
            return this.UserController.all(request, response);
        });
        this.router.get("/users/find/:id", (request: Request, response: Response) => {
            return this.UserController.find(request, response);
        });
        this.router.post("/users/create", (request: Request, response: Response) => {
            return this.UserController.all(request, response);
        });
        this.router.put("/users/update/:id", (request: Request, response: Response) => {
            return this.UserController.update(request, response);
        });
        this.router.delete("/users/delete/:id", (request: Request, response: Response) => {
            return this.UserController.delete(request, response);
        });
    }   

    public getRoutes(): any {
        return this.router;
    }
}

export default UserRouter;