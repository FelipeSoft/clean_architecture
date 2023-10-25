import { Router } from "express";
import IRouter from "../../domain/interfaces/IRouter";
import UserController from "../controllers/UserController";

class UserRouter implements IRouter {
    public constructor(
        private readonly UserController: UserController, 
        private readonly router: Router
    ) {
        this.init();
    }

    public init(): void {
        this.router.get("/users/all", (req, res) => this.UserController.all(req, res));
        this.router.get("/users/find/:id", (req, res) => this.UserController.find(req, res));
        this.router.post("/users/create", (req, res) => this.UserController.create(req, res));
        this.router.put("/users/update/:id", (req, res) => this.UserController.update(req, res));
        this.router.delete("/users/delete/:id", (req, res) => this.UserController.delete(req, res));
    }

    public getRoutes(): Router {
        return this.router;
    }
}

export default UserRouter;