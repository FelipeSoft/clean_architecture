import { Router } from "express";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";
import UserRepositoryMySQL from "../../persistence/repositories/UserRepository";
import UserController from "../controllers/UserController";
import CreateUser from "../usecases/User/CreateUser";
import DeleteUser from "../usecases/User/DeleteUser";
import FindUser from "../usecases/User/FindUser";
import GetAllUsers from "../usecases/User/GetAllUsers";
import UpdateUser from "../usecases/User/UpdateUser";
import Database from "../../../core/Database";
import GenerateEmail from "../usecases/User/GenerateEmail";

const connection = new Database();

const userDao = new UserDataAccessObjectSQL(connection.getConnection());
const userRepository = new UserRepositoryMySQL(userDao);
const generateEmail = new GenerateEmail(userRepository);

const createUser = new CreateUser(userRepository, generateEmail);
const getAllUsers = new GetAllUsers(userRepository);
const findUser = new FindUser(userRepository);
const updateUser = new UpdateUser(userRepository);
const deleteUser = new DeleteUser(userRepository);

const userController = new UserController(createUser, getAllUsers, findUser, updateUser, deleteUser);

export { userController };