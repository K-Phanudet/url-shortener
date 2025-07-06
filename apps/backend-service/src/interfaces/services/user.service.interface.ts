import { User } from "../../domain/entities/user.entity"

export interface IUserService {
    createUser(user: User): Promise<User | null>
    getUserByUsername(username: string): Promise<User | null>
}