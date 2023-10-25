import User from "../../domain/entities/User";
import IUserRepository from "../../domain/interfaces/User/IUserRepository";
import IUserDataAccessObject from "../../domain/interfaces/User/IUserDataAccessObject";

class UserRepositoryMySQL implements IUserRepository {
    public constructor (private readonly UserDataAccessObject: IUserDataAccessObject) {}
        
    public async getAllUsers(): Promise<User[] | null> {
        const dao = this.UserDataAccessObject;
        const usersFromDatabase = await dao.all();
        let users: User[] = [];

        if (usersFromDatabase && Array.isArray(usersFromDatabase)) {    
            for(let i = 0; i < usersFromDatabase.length; i++) {
                const user = new User();

                user.setId(usersFromDatabase[i].id);
                user.setName(usersFromDatabase[i].name);
                user.setEmail(usersFromDatabase[i].email);
                user.setPassword(usersFromDatabase[i].password);

                users.push(user);
            }

            return users;
        }

        return null;
    }

    public async getUserById(id: number): Promise<any | null> {
        const dao = this.UserDataAccessObject;
        const userFromDatabase = await dao.find(id);
        
        if (userFromDatabase) {
            let user = new User();

            user.setId(userFromDatabase[0].id);
            user.setName(userFromDatabase[0].name);
            user.setEmail(userFromDatabase[0].email);
            user.setPassword(userFromDatabase[0].password);

            return user;
        }
        return null;
    }
    public async createUser(user: User): Promise<void> {
        const dao = this.UserDataAccessObject;
        await dao.create(user);
    }
    public async updateUser(user: User): Promise<void> {
        const dao = this.UserDataAccessObject;
        await dao.update(user);
    }
    public async deleteUser(id: number): Promise<void> {
        const dao = this.UserDataAccessObject;
        await dao.delete(id);
    }
}

export default UserRepositoryMySQL;