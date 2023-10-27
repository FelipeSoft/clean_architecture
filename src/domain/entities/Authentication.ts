import bcrypt from "bcrypt";

class Authentication {
    public constructor(private readonly credentials: Credentials) {}
}

type Credentials = {
    email: string;
    password: string;
}