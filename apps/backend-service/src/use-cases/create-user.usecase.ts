import { User } from "../domain/entities/user.entity";
import { IUserService } from "../interfaces/services/user.service.interface";
import { v4 as uuid } from "uuid"
export class CreateUserUseCase {
    constructor(
        private userService: IUserService
    ) { }

    async execute(username: string, password: string): Promise<CreateUserResponse> {
        try {
            const bcryptHash = await Bun.password.hash(password);

            const user = new User(uuid(), username, bcryptHash, new Date())

            const createdUser = await this.userService.createUser(user)
            if (createdUser === null) {
                throw new Error("Failed to create user")
            }
            return {
                id: createdUser.id,
                username: createdUser.username,
                createdAt: createdUser.createdAt
            }
        } catch (error) {
            console.log(error)
            throw error
        }

    }
}