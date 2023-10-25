interface IAuthenticationRepository {
    getAccessorByEmail(email: string): Promise<Authentication | null>;
}   

export default IAuthenticationRepository;