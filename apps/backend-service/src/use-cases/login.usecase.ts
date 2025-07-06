import { IUserService } from "../interfaces/services/user.service.interface";

export class LoginUseCase {
    constructor(
        private userService: IUserService
    ){}

    async execute(credentials: LoginDto): Promise<LoginResponseDto>{
        const user = await this.userService.getUserByUsername(credentials.username)
        if(!user){
            throw new Error("User not found")
        }
        const isPasswordValid = await user.verifyPassword(credentials.password)
        if(!isPasswordValid){
            throw new Error("Unauthen")
        }
        return {
            id: user.id,
            username: user.username,
            createdAt: user.createdAt
        }
    }
}