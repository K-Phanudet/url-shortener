import { IUserEntity } from "../interfaces/domain/user.entity.interface";
import { IUserRepository } from "../interfaces/repositories/user.repository.interface";
import { IUserService } from "../interfaces/services/user.service.interface";


export class UserService implements IUserService {
    constructor(
        private userRepository: IUserRepository
    ){
        this.userRepository = userRepository
    }

    public async createUser(user: IUserEntity): Promise<IUserEntity | null> {
        const existingUser = await this.userRepository.findByUsername(user.username)
        if(existingUser){
            // TODO: rewrite error message
            throw new Error("Username already used")
        }
        await this.userRepository.create(user)
        return this.getUserByUsername(user.username)
    }

    public async getUserByUsername(username: string): Promise<IUserEntity | null>{
        return this.userRepository.findByUsername(username)
    }
}