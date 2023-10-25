export default class UserIdMissingError extends Error {
    public constructor (message: string) {
        super(message);
        this.name = "UserIdMissingError";
    }
}