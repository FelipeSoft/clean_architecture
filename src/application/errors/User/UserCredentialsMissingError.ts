export default class UserCredentialsMissingError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "UserCredentialsMissingError";
    }
}