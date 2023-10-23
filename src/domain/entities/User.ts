class User {
    private _id: number | null = null;
    private _name: string | null = null;
    private _email: string | null = null;
    private _password: string | null = null;

    //incluir validações para lançar exceções (throw new Error);

    public set id(id: number) {
        this._id = id;
    }  
    
    public set name(name: string) {
        this._name = name;
    }    

    public set email(email: string) {
        this._email = email;
    }    

    public set password(password: string) {
        this._password = password;
    }    

    public get id(): number | null {
        return this._id;
    }
    
    public get name(): string | null {
        return this._name;
    }

    public get email(): string | null {
        return this._email;
    }

    public get password(): string | null{
        return this._password;
    }
}

export default User;