import UserCredentialsInvalidError from "../../application/errors/User/UserCredentialsInvalidError";
import UserIdInvalidError from "../../application/errors/User/UserIdInvalidError";

class User {
    public constructor(
        private name: string,
        private email: string,
        private password: string,
        private readonly id?: number
    ) {
        if (this.id && this.isValidId(this.id)) {
            this.id = id;
        }

        this.isValidName(this.name) ? this.name = name : null;
        this.isValidEmail(this.email) ? this.email = email : null;
        this.isValidPassword(this.password) ? this.password = password : null;
    }

    private isValidId(id: number): boolean {
        if (id && (!Number.isInteger(id) || id < 0)) {
            throw new UserIdInvalidError("User Error: Cannot use this ID. All them should bigger than 0 and integers.");
        }
        return true;
    }

    private isValidName(name: string): boolean {
        if (name && name.length < 2) {
            throw new UserCredentialsInvalidError("User Error: Cannot use this name. All them should are bigger than size two.");
        }
        return true;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (email && !regex.test(email)) {
            throw new UserCredentialsInvalidError("User Error: Cannot use a invalid email. Please make sure to enter a valid email address.");
        }

        return true;
    }
    
    private isValidPassword(password: string): boolean {
        if (password.length < 8) {
            throw new UserCredentialsInvalidError("User Error: Cannot use this password. All them should are bigger or equal than size eight.");
        }

        return true;
    }
}

export default User;