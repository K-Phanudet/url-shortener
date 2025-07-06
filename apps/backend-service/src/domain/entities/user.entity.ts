import { IUserEntity } from "../../interfaces/domain/user.entity.interface";

export class User implements IUserEntity{ 
    constructor(
        public id: string,
        public username: string,
        public password: string,
        public createdAt: Date = new Date(),
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.createdAt = createdAt;
    }

    async verifyPassword(password: string): Promise<boolean> {
        return await Bun.password.verify(password, this.password);
    }


}