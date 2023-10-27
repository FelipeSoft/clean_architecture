import User from "../../domain/entities/User";
import IUserRepository from "../../domain/interfaces/User/IUserRepository";
import IUserDataAccessObject from "../../domain/interfaces/User/IUserDataAccessObject";
import UserDTO from "../dto/UserDTO";

class UserRepository implements IUserRepository {
    public constructor(private readonly UserDataAccessObject: IUserDataAccessObject) { }

    public async getUserByEmail(email: string): Promise<User | null> {
        const dao = this.UserDataAccessObject;
        const userFromDatabase = await dao.findByEmail(email);

        if (userFromDatabase) {
            let user = new User(
                userFromDatabase[0].name,
                userFromDatabase[0].email,
                userFromDatabase[0].password,
                userFromDatabase[0].id
            );

            return user;
        }
        return null;
    }

    public async getAllUsers(): Promise<User[] | User | null>
    {
        const dao = this.UserDataAccessObject;
        const usersFromDatabase = await dao.all();
        let users: User[] = [];

        if (usersFromDatabase && Array.isArray(usersFromDatabase)) {
            for (let i = 0; i < usersFromDatabase.length; i++) {
                const user = new User(
                    usersFromDatabase[i].name,
                    usersFromDatabase[i].email,
                    usersFromDatabase[i].password,
                    usersFromDatabase[i].id,
                );

                users.push(user);
            }

            return users;
        }

        return null;
    }

    public async getUserById(id: number): Promise<User | null> 
    {
        const dao = this.UserDataAccessObject;
        const userFromDatabase = await dao.find(id);

        if (userFromDatabase) {
            let user = new User(
                userFromDatabase[0].name,
                userFromDatabase[0].email,
                userFromDatabase[0].password,
                userFromDatabase[0].id
            );

            return user;
        }
        return null;
    }

    public async createUser(user: User): Promise<void> 
    {
        const dao = this.UserDataAccessObject;
        await dao.create(user);
    }

    public async updateUser(user: User): Promise<void> 
    {
        const dao = this.UserDataAccessObject;
        await dao.update(user);
    }

    public async deleteUser(id: number): Promise<void> 
    {
        const dao = this.UserDataAccessObject;
        await dao.delete(id);
    }
}

export default UserRepository;