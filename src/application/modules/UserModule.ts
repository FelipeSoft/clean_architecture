// userModule.ts
import UserController from "../controllers/UserController";
import CreateUser from "../usecases/Users/CreateUser";
import UserRepositorySQL from "../../persistence/repositories/UserRepositoryMySQL";
import GetAllUsers from "../usecases/Users/GetAllUsers";
import FindUser from "../usecases/Users/FindUser";
import UpdateUser from "../usecases/Users/UpdateUser";
import DeleteUser from "../usecases/Users/DeleteUser";
import UserDataAccessObjectSQL from "../../persistence/dao/UserDataAccessObjectMySQL";

// const userDataAccessObject = new UserDataAccessObjectSQL(pool);
// const userRepository = new UserRepositorySQL(userDataAccessObject);

// const createUser = new CreateUser(userRepository);
// const getAllUsers = new GetAllUsers(userRepository);
// const findUser = new FindUser(userRepository);
// const updateUser = new UpdateUser(userRepository);
// const deleteUser = new DeleteUser(userRepository);

// export const userController = new UserController(
//     createUser,
//     getAllUsers,
//     findUser,
//     updateUser,
//     deleteUser
// );
