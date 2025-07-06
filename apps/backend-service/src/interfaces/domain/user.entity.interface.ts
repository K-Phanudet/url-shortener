export interface IUserEntity {
    id: string
    username: string
    password: string
    createdAt: Date
    verifyPassword(password: string): Promise<boolean>
}