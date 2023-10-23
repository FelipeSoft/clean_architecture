import { Router } from "express";
import UserController from "../controllers/UserController";
import CreateUser from "../usecases/Users/CreateUser";
import UserRepositorySQL from "../../persistence/repositories/UserRepositoryMySQL";
import GetAllUsers from "../usecases/Users/GetAllUsers";
import FindUser from "../usecases/Users/FindUser";
import UpdateUser from "../usecases/Users/UpdateUser";
import DeleteUser from "../usecases/Users/DeleteUser";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";
import app from "../app";

const userRoutes = Router();

const createUser = new CreateUser(new UserRepositorySQL(new UserDataAccessObjectSQL(app.pool)));
const getAllUsers = new GetAllUsers(new UserRepositorySQL(new UserDataAccessObjectSQL(app.pool)));
const findUser = new FindUser(new UserRepositorySQL(new UserDataAccessObjectSQL(app.pool)));
const updateUser = new UpdateUser(new UserRepositorySQL(new UserDataAccessObjectSQL(app.pool)));
const deleteUser = new DeleteUser(new UserRepositorySQL(new UserDataAccessObjectSQL(app.pool)));

const userController = new UserController(
  createUser,
  getAllUsers,
  findUser,
  updateUser,
  deleteUser
);

userRoutes.get("/users/all", userController.all);
userRoutes.get("/users/find/:id", userController.find);
userRoutes.post("/users/create", userController.create);
userRoutes.put("/users/update/:id", userController.update);
userRoutes.delete("/users/delete/:id", userController.delete);

export default userRoutes;