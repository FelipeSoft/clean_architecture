import UserCredentialsInvalidError from "../../../src/application/errors/User/UserCredentialsInvalidError";
import UserIdInvalidError from "../../../src/application/errors/User/UserIdInvalidError";
import User from "../../../src/domain/entities/User";

describe("User Entity", () => {    
    it("Lançar exceção caso o ID seja inválido", () => {
        expect(() => new User("Felipe", "felipe@gmail.com", "felipe123", -1)).toThrow(UserIdInvalidError);
    });

    it("Lançar exceção caso o Nome seja inválido", () => {
        expect(() => new User("F", "felipe@gmail.com", "felipe123", 2)).toThrow(UserCredentialsInvalidError);
    });

    it("Lançar exceção caso o Email seja inválido", () => {
        expect(() => new User("Felipe", "felipe", "felipe123", 5)).toThrow(UserCredentialsInvalidError);
    });

    it("Lançar exceção caso a Senha seja inválida", () => {
        expect(() => new User("Felipe", "felipe", "felipe", 10)).toThrow(UserCredentialsInvalidError);
    });
});