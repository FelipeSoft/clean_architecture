import { Router } from "express";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";
import UserRepositoryMySQL from "../../persistence/repositories/UserRepositoryMySQL";
import UserController from "../controllers/UserController";
import UserRouter from "../routers/UserRouter";
import CreateUser from "../usecases/Users/CreateUser";
import DeleteUser from "../usecases/Users/DeleteUser";
import FindUser from "../usecases/Users/FindUser";
import GetAllUsers from "../usecases/Users/GetAllUsers";
import UpdateUser from "../usecases/Users/UpdateUser";
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