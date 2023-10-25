class UserIdInvalidError extends Error {
    public constructor(message: string) {
        super(message);
        this.name = "UserIdInvalidError";
    }
}