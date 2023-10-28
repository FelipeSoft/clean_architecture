import UserCredentialsInvalidError from "../../application/errors/User/UserCredentialsInvalidError";
import UserIdInvalidError from "../../application/errors/User/UserIdInvalidError";
import bcrypt from "bcrypt";

class User {
    public constructor(
        public name: string,
        public email: string,
        public password: string,
        public readonly id?: number
    ) {
        if (this.id && this.isValidId(this.id)) {
            this.id = id;
        }

        this.isValidName(this.name) ? name = name : null;
        this.isValidEmail(this.email) ? email = email : null;
        this.isValidPassword(this.password) ? password = password : null;
    }

    public updateName(name: string): boolean {
        return this.isValidName(name);
    }

    public updateEmail(email: string): boolean {
        return this.isValidEmail(email);
    }

    public updatePassword(password: string): boolean {
        return this.isValidPassword(password);
    }

    private isValidId(id: number): boolean {
        if (id && (!Number.isInteger(id) || id < 0)) {
            throw new UserIdInvalidError("Cannot use this ID. All them should bigger than 0 and integers.");
        }
        return true;
    }

    private isValidName(name: string): boolean {
        if (name && name.length < 2) {
            throw new UserCredentialsInvalidError("Cannot use this name. All them should are bigger than size two.");
        }
        return true;
    }

    private isValidEmail(email: string): boolean {
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (email && !regex.test(email)) {
            throw new UserCredentialsInvalidError("Cannot use a invalid email. Please make sure to enter a valid email address.");
        }

        return true;
    }

    private isValidPassword(password: string): boolean {
        if (password.length < 8) {
            throw new UserCredentialsInvalidError("Cannot use this password. All them should are bigger or equal than size eight.");
        }

        return true;
    }
}

export default User;