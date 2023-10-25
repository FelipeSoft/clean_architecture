import IUserRepository from "../../../domain/interfaces/User/IUserRepository";

class DeleteUser {
    public constructor(private readonly UserRepository: IUserRepository) {}

    public async execute(id: number): Promise<void> { await this.UserRepository.deleteUser(id); }
}

export default DeleteUser;