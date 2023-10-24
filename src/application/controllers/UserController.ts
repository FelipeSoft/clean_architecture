import { Request, Response } from "express";
import CreateUser from "../usecases/Users/CreateUser";
import GetAllUsers from "../usecases/Users/GetAllUsers";
import FindUser from "../usecases/Users/FindUser";
import UpdateUser from "../usecases/Users/UpdateUser";
import DeleteUser from "../usecases/Users/DeleteUser";

class UserController {
    public constructor(
        private readonly CreateUser: CreateUser,
        private readonly GetAllUsers: GetAllUsers,
        private readonly FindUser: FindUser,
        private readonly UpdateUser: UpdateUser,
        private readonly DeleteUser: DeleteUser
    ) { }

    public async all(request: Request, response: Response): Promise<Response> {
        const users = await this.GetAllUsers.execute();

        if (!users) {
            return response.status(404).json({
                error: "Cannot find any user on database"
            });
        }

        return response.status(200).json(users);
    }

    public async find(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        const user = await this.FindUser.execute(id);
        if (!user) {
            return response.status(404).json({
                error: "Cannot find an user with id " + id
            });
        }

        return response.status(200).json(user);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const user = request.body.data;
        await this.CreateUser.execute(user);

        return response.status(201).json({
            success: "User was inserted on database"
        });
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const user = request.body.user;

        if (user.id) {
            await this.UpdateUser.execute(user);
            return response.status(200).json({
                success: "User was updated on database"
            });
        }

        return response.status(400).json({
            error: "Missing field id"
        });
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const id = parseInt(request.params.id);
        await this.DeleteUser.execute(id);

        return response.status(200).json({
            success: "User was deleted"
        });
    }

}

export default UserController;