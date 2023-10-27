import Database from "../../config/database";
import UserNotFoundError from "../../src/application/errors/User/UserNotFoundError";
import GetAllUsers from "../../src/application/usecases/User/GetAllUsers";
import UserDataAccessObjectSQL from "../../src/persistence/dao/UserDataAccessObjectMySQL";
import UserRepository from "../../src/persistence/repositories/UserRepository";

describe("GetAllUsers", () => {
    it("Deve lançar uma execeção caso não haja nenhum usuário no banco de dados", async () => {
        const connection = new Database();
        const dao = new UserDataAccessObjectSQL(connection.getConnection());
        const repository = new UserRepository(dao);
        const useCase = new GetAllUsers(repository);

        try {
            await useCase.execute();
            fail("Não lançou a execeção do useCase GetAllUsers");
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                expect(error).toBeInstanceOf(UserNotFoundError);
                expect(error.message).toBe("Cannot find users on database.");
            }
        } finally {
            connection.closeConnection();
        }
    });
});