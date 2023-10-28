import { Request, Response, Router } from "express";
import { userController } from "../modules/UserModule";

const userRoutes = Router();

userRoutes.get("/users/all", (request: Request, response: Response) => {
    return userController.all(request, response)
});

userRoutes.get("/users/find/:id", (request: Request, response: Response) => {
    return userController.find(request, response)
});

userRoutes.post("/users/create", (request: Request, response: Response) => {
    return userController.create(request, response)
});

userRoutes.put("/users/update/:id", (request: Request, response: Response) => {
    return userController.update(request, response)
});

userRoutes.delete("/users/delete/:id", (request: Request, response: Response) => {
    return userController.delete(request, response)
});

export default userRoutes;