import { Request, Response } from "express";
import CreateUser from "../usecases/User/CreateUser";
import GetAllUsers from "../usecases/User/GetAllUsers";
import FindUser from "../usecases/User/FindUser";
import UpdateUser from "../usecases/User/UpdateUser";
import DeleteUser from "../usecases/User/DeleteUser";
import UserNotFoundError from "../errors/User/UserNotFoundError";
import UserIdMissingError from "../errors/User/UserIdMissingError";
import UserCredentialsMissingError from "../errors/User/UserCredentialsMissingError";
import UserIdInvalidError from "../errors/User/UserIdInvalidError";

class UserController {
    public constructor(
        private readonly createUser: CreateUser,
        private readonly getAllUsers: GetAllUsers,
        private readonly findUser: FindUser,
        private readonly updateUser: UpdateUser,
        private readonly deleteUser: DeleteUser
    ) { }

    public async all(request: Request, response: Response): Promise<Response> {
        try {
            const users = await this.getAllUsers.execute();

            if (!users) {
                return response.status(404).json({
                    error: "Cannot find any user on database"
                });
            }

            return response.status(200).json(users);
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return response.status(404).json({
                    error: error.message
                });
            } else {
                return response.status(500).json({
                    error: "Internal Server Error"
                });
            }
        }
    }

    public async find(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            const user = await this.findUser.execute(id);

            if (!user) {
                return response.status(404).json({
                    error: "Cannot find an user with id " + id
                });
            }

            return response.status(200).json(user);
        } catch (error) {
            if (error instanceof UserIdMissingError) {
                return response.status(400).json({
                    error: error.message
                });
            } else if (error instanceof UserIdInvalidError) {
                return response.status(400).json({
                    error: error.message
                });
            } else if (error instanceof UserNotFoundError) {
                return response.status(404).json({
                    error: error.message
                });
            } else {
                return response.status(500).json({
                    error: "Internal Server Error"
                });
            }
        }
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const user = request.body.data;
            await this.createUser.execute(user);

            return response.status(201).json({
                success: "User was inserted on database"
            });
        } catch (error) {
            if (error instanceof UserCredentialsMissingError) {
                return response.status(422).json({
                    error: error.message
                });
            } else {
                return response.status(500).json({
                    error: "Internal Server Error"
                });
            }
        }
    }

    public async update(request: Request, response: Response): Promise<Response> {
        try {
            const user = request.body.user;

            if (user.id) {
                await this.updateUser.execute(user);
                return response.status(200).json({
                    success: "User was updated on database"
                });
            }

            return response.status(400).json({
                error: "Missing field id"
            });
        } catch (error) {
            if (error instanceof UserIdInvalidError) {
                return response.status(404).json({
                    error: error.message
                });
            } else {
                return response.status(500).json({
                    error: "Internal Server Error"
                });
            }
        }
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        try {
            const id = parseInt(request.params.id);
            await this.deleteUser.execute(id);

            return response.status(200).json({
                success: "User was deleted"
            });
        } catch (error) {
            if (error instanceof UserIdMissingError || error instanceof UserIdInvalidError) {
                return response.status(400).json({
                    error: error.message
                });
            } else {
                return response.status(500).json({
                    error: "Internal Server Error"
                });
            }
        }
    }

}

export default UserController;