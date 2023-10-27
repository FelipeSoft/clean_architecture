import { expect } from "@jest/globals";
import UserRepositoryMySQL from "../../src/persistence/repositories/UserRepository";
import UserDataAccessObjectSQL from "../../src/persistence/dao/UserDataAccessObjectMySQL";
import Database from "../../config/database";
import UpdateUser from "../../src/application/usecases/User/UpdateUser";
import UserDTO from "../../src/persistence/dto/UserDTO";
import UserIdMissingError from "../../src/application/errors/User/UserIdMissingError";
import UserCredentialsMissingError from "../../src/application/errors/User/UserCredentialsMissingError";

describe("UpdateUser", () => {
  // it("Deve lançar uma exceção caso ID não esteja presente", async () => {
  //   const connection = new Database();
  //   const dao = new UserDataAccessObjectSQL(connection.getConnection());
  //   const userRepositoryMock = new UserRepositoryMySQL(dao);

  //   const userDTO = new UserDTO({ name: "Felipe", email: "felipe@gmail.com", password: "felipe123" });

  //   const useCase = new UpdateUser(userRepositoryMock);

  //   expect(async () => await useCase.execute(userDTO)).toThrowError(UserIdMissingError);
  // });

  it("Deve lançar uma exceção quando não houver nenhum campo informado", async () => {
    const connection = new Database();
    const dao = new UserDataAccessObjectSQL(connection.getConnection());
    const userRepositoryMock = new UserRepositoryMySQL(dao);

    const userDTO = new UserDTO({ id: 2 });

    const useCase = new UpdateUser(userRepositoryMock);

    expect(async () => await useCase.execute(userDTO)).toThrowError(UserCredentialsMissingError);
  });
});

