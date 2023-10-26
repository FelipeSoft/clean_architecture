import User from "../../entities/User";

export default interface IUserDataAccessObject {
    all(): Promise<any[] | any | null>;

    find(id: number): Promise<any | null>; 

    create(user: User): Promise<void>; 

    update(user: Partial<User>): Promise<void>; 

    delete(id: number): Promise<void>;
}