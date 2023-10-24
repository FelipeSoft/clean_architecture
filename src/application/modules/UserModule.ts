import UserController from "../controllers/UserController";
import CreateUser from "../usecases/Users/CreateUser";
import UserRepositorySQL from "../../persistence/repositories/UserRepositoryMySQL";
import GetAllUsers from "../usecases/Users/GetAllUsers";
import FindUser from "../usecases/Users/FindUser";
import UpdateUser from "../usecases/Users/UpdateUser";
import DeleteUser from "../usecases/Users/DeleteUser";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";
import { pool } from "../../server";

const userDataAccessObject: UserDataAccessObjectSQL = new UserDataAccessObjectSQL(pool);
const userRepository: UserRepositorySQL = new UserRepositorySQL(userDataAccessObject);

const createUser: CreateUser = new CreateUser(userRepository);
const getAllUsers: GetAllUsers = new GetAllUsers(userRepository);
const findUser: FindUser = new FindUser(userRepository);
const updateUser: UpdateUser = new UpdateUser(userRepository);
const deleteUser: DeleteUser = new DeleteUser(userRepository);

export const userController = new UserController(
    createUser,
    getAllUsers,
    findUser,
    updateUser,
    deleteUser
);
