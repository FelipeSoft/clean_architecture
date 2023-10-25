class Authentication {
    public constructor(private readonly credentials: Credentials) {}
    
    public recoverPassword(): string {
        return this.credentials.email;
    }
}

type Credentials = {
    email: string;
    password: string;
}