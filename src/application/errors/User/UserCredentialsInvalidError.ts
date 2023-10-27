export default class UserCredentialsInvalidError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "UserCredentialsInvalidError";
    }
}
