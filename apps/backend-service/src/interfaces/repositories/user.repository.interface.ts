import { IUserEntity } from "../domain/user.entity.interface";

export interface IUserRepository {
    findById(id: string): Promise<IUserEntity | null>;
    findByUsername(username: string): Promise<IUserEntity | null>;
    create(user: IUserEntity): Promise<void>;
    delete(id: string): Promise<void>;
}