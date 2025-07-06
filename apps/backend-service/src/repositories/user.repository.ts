import Database from "bun:sqlite";
import { IUserRepository } from "../interfaces/repositories/user.repository.interface";
import { User } from "../domain/entities/user.entity";
import { IUserEntity } from "../interfaces/domain/user.entity.interface";


export class UserRepository implements IUserRepository {
    private db: Database;

    constructor(databaseConnection: Database) {
        this.db = databaseConnection
    }

    public async findById(id: string): Promise<IUserEntity | null> {
        const query = this.db.query(
            'SELECT id, username, password, created_at FROM users WHERE id = ?'
        )
        const model = await query.get(id) as IUserModel | null
        if (!model) return null
        return this.toEntity(model)
    }

    public async findByUsername(username: string): Promise<IUserEntity | null> {
        const query = this.db.query(
            'SELECT id, username, password, created_at FROM users WHERE username = ?'
        )
        const model = await query.get(username) as IUserModel | null
        if (!model) return null
        return this.toEntity(model)
    }

    private toEntity(model: IUserModel): IUserEntity {
        return new User(
            model.id,
            model.username,
            model.password,
            new Date(model.created_at)
        )
    }

    public async create(user: User): Promise<void> {
        const insert = this.db.prepare("INSERT INTO users (id, username, password, created_at) VALUES (?, ?, ?, ?)");
        insert.run(user.id, user.username, user.password, user.createdAt.toISOString());
    }

    public async delete(id: string): Promise<void> {
        const deleteStmt = this.db.prepare("DELETE FROM users WHERE id = $userId")
        deleteStmt.run({ userId: id })
    }
}