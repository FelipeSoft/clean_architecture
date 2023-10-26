import UserIdInvalidError from "../../application/errors/User/UserIdInvalidError";

class User {
    public readonly id?: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public constructor(
        name: string, 
        email: string, 
        password: string,
        id?: number
    ) {
        if (id) this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public isValid(id: number) {
        if (!Number.isInteger(id) || id < 0) {
            throw new UserIdInvalidError("Entity User Error: Cannot use a invalid ID");
        }
        return true;
    }
}

export default User;