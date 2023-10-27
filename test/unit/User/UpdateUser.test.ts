import { expect } from "@jest/globals";
import UserRepositoryMySQL from "../../../src/persistence/repositories/UserRepository";
import UserDataAccessObjectSQL from "../../../src/persistence/dao/UserDataAccessObjectMySQL";
import Database from "../../../config/database";
import UpdateUser from "../../../src/application/usecases/User/UpdateUser";
import UserDTO from "../../../src/persistence/dto/UserDTO";
import UserIdMissingError from "../../../src/application/errors/User/UserIdMissingError";
import UserCredentialsMissingError from "../../../src/application/errors/User/UserCredentialsMissingError";
import UserRepository from "../../../src/persistence/repositories/UserRepository";
import UserNotFoundError from "../../../src/application/errors/User/UserNotFoundError";

describe("UpdateUser", () => {
  it("Deve lançar uma exceção caso ID não esteja presente", async () => {
    const connection = new Database();
    const dao = new UserDataAccessObjectSQL(connection.getConnection());
    const userRepositoryMock = new UserRepository(dao);

    const userDTO = new UserDTO("Felipe", "felipe@gmail.com", "felipe123");

    const useCase = new UpdateUser(userRepositoryMock);

    try {
      await useCase.execute(userDTO);
      fail("Expected an error to be thrown");
    } catch (error) {
      if (error instanceof UserIdMissingError) {
        expect(error).toBeInstanceOf(UserIdMissingError);
        expect(error.message).toBe("Missing field ID.");
      }
    } finally {
      connection.closeConnection();
    }
  });

  it("Deve lançar uma exceção quando não houver pelo menos 1 campo informado", async () => {
    const connection = new Database();
    const dao = new UserDataAccessObjectSQL(connection.getConnection());
    const useCase = new UpdateUser(new UserRepositoryMySQL(dao));
    const dto = new UserDTO("Felipe", "felipe@gmail.com", "felipe123", 2);

    try {
      await useCase.execute(dto);
      fail("Expected an error to be thrown");
    } catch (error) {
      if (error instanceof UserCredentialsMissingError) {
        expect(error).toBeInstanceOf(UserCredentialsMissingError);
        expect(error.message).toBe("Few arguments to update. Expected at least 1 argument.");
      }
    } finally {
      connection.closeConnection();
    }
  });

  it("Deve lançar uma execeção quando não encontrar um usuário com ID desconhecido", async () => {
    const connection = new Database();
    const dao = new UserDataAccessObjectSQL(connection.getConnection());
    const useCase = new UpdateUser(new UserRepositoryMySQL(dao));
    const dto = new UserDTO("Felipe", "felipe@gmail.com", "felipe123", 129489237);

    try {
      await useCase.execute(dto);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        expect(error).toBeInstanceOf(UserNotFoundError);
        expect(error.message).toBe("Cannot find user.");
      }
    } finally {
      connection.closeConnection();
    }
  });
});

