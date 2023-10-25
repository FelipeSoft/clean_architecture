export default class UserNotFoundError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "UserNotFoundError"
    }
}