class IUserDTO {
    public id?: number;
    public name?: string;
    public email?: string;
    public password?: string;

    public constructor (name?: string, email?: string, password?: string, id?: number) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

export default IUserDTO;
