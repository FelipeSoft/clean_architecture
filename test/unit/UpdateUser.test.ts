import UpdateUser from "../../src/application/usecases/User/UpdateUser";
import User from "../../src/domain/entities/User";
import { expect } from "@jest/globals";
import UserRepositoryMySQL from "../../src/persistence/repositories/UserRepository";
import UserIdInvalidError from "../../src/application/errors/User/UserIdInvalidError";
import UserDataAccessObjectSQL from "../../src/persistence/dao/UserDataAccessObjectMySQL";
import Database from "../../config/database";

const connection = new Database();
const dao = new UserDataAccessObjectSQL(connection.getConnection())
const userRepositoryMock: UserRepositoryMySQL = new UserRepositoryMySQL(dao);

describe("UpdateUser", () => {
  it("deve atualizar um usuário com dados válidos", async () => {
    const user = new User();
    user.setId(2);
    user.setName("Felipasso");
    user.setEmail("felipe@gmail.com");
    user.setPassword("felipe");

    const updateUser = new UpdateUser(userRepositoryMock);

    await expect(updateUser.execute(user)).resolves.not.toThrow();
    expect(userRepositoryMock.updateUser).toHaveBeenCalledWith(user);
  });

  it("deve lançar UserIdInvalidError para ID inválido", async () => {
    const user = new User();
    user.setId(-1); 

    const updateUser = new UpdateUser(userRepositoryMock);

    await expect(updateUser.execute(user)).rejects.toThrow(UserIdInvalidError);
    expect(userRepositoryMock.updateUser).not.toHaveBeenCalled();
  });
});
