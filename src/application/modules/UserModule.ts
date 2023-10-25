import { Router } from "express";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";
import UserRepositoryMySQL from "../../persistence/repositories/UserRepository";
import UserController from "../controllers/UserController";
import UserRouter from "../routers/UserRouter";
import CreateUser from "../usecases/User/CreateUser";
import DeleteUser from "../usecases/User/DeleteUser";
import FindUser from "../usecases/User/FindUser";
import GetAllUsers from "../usecases/User/GetAllUsers";
import UpdateUser from "../usecases/User/UpdateUser";
import Database from "../../../config/database";

const router = Router();
const connection = new Database();

const userDao = new UserDataAccessObjectSQL(connection.getConnection());
const userRepository = new UserRepositoryMySQL(userDao);

const createUser = new CreateUser(userRepository);
const getAllUsers = new GetAllUsers(userRepository);
const findUser = new FindUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(createUser, getAllUsers, findUser, updateUser, deleteUser);
const userRouter = new UserRouter(userController, router);

export { userRouter };