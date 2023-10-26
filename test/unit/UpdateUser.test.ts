import UpdateUser from "../../src/application/usecases/User/UpdateUser";
import User from "../../src/domain/entities/User";
import { expect } from "@jest/globals";
import UserRepositoryMySQL from "../../src/persistence/repositories/UserRepository";
import UserIdInvalidError from "../../src/application/errors/User/UserIdInvalidError";
import UserDataAccessObjectSQL from "../../src/persistence/dao/UserDataAccessObjectMySQL";
import Database from "../../config/database";

describe("UpdateUser", () => {
  // it("deve atualizar um usuário com dados válidos", async () => {
  //   const user = new User();
  //   user.setId(2);
  //   user.setName("Felipasso");
  //   user.setEmail("felipe@gmail.com");
  //   user.setPassword("felipe");

  //   const updateUser = new UpdateUser(userRepositoryMock);

  //   await expect(updateUser.execute(user)).resolves.not.toThrow();
  //   expect(userRepositoryMock.updateUser).not.toHaveBeenCalledWith();
  // });

  it("deve lançar UserIdInvalidError para ID inválido", async () => {
    const connection = new Database();
    const dao = new UserDataAccessObjectSQL(connection.getConnection());
    const userRepositoryMock = new UserRepositoryMySQL(dao);
    
    const user = new User();
    user.id = -1;
    user.name = "Felipe";

    const updateUser = new UpdateUser(userRepositoryMock);

    try {
      await updateUser.execute(user);

      fail("A exceção UserIdInvalidError não foi lançada.");
    } catch (error) {
      expect(error).toBeInstanceOf(UserIdInvalidError);
    }
  });
});
