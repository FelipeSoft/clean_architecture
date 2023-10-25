class User {
    private id!: number;
    private name!: string;
    private email!: string;
    private password!: string;

    public setId(id: number) {
        this.id = id;
    }  
    
    public setName(name: string) {
        this.name = name;
    }    

    public setEmail(email: string) {
        this.email = email;
    }    

    public setPassword(password: string) {
        this.password = password;
    }    

    public getId(): number {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string{
        return this.password;
    }
}

export default User;