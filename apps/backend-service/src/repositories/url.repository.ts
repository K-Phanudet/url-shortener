import Database from "bun:sqlite";
import { IUrlEntity } from "../interfaces/domain/url.entity.interface";
import { IUrlRepository } from "../interfaces/repositories/url.repository.interface";
import { Url } from "../domain/entities/url.entity";

export class UrlRepository implements IUrlRepository {
    private db: Database;

    constructor(databaseConnection: Database) {
        this.db = databaseConnection
    }

    private toEntity(model: IUrlModel): IUrlEntity {
        return new Url(
            model.id,
            model.short_url,
            model.long_url,
            model.owner,
            model.visited_count,
            new Date(model.created_at),
            new Date(model.updated_at)
        )
    }

    public async findById(id: string): Promise<IUrlEntity | null> {
        const query = this.db.query(
            'SELECT * FROM urls WHERE id = ?'
        )
        const model = await query.get(id) as IUrlModel | null
        if (!model) return null
        return this.toEntity(model)
    }
    public async findByShortUrl(url: string): Promise<IUrlEntity | null> {
        const query = this.db.query(
            'SELECT * FROM urls WHERE short_url = ?'
        )
        const model = await query.get(url) as IUrlModel | null
        if (!model) return null
        return this.toEntity(model)
    }

    public async findByOwner(ownerId: string): Promise<IUrlEntity[]> {
        const query = this.db.query(
            'SELECT * FROM urls WHERE owner = ?'
        )
        const models = await query.all(ownerId) as IUrlModel[]
        return models.map(model => this.toEntity(model))
    }

    public async update(urlEntity: IUrlEntity): Promise<void> {
        const query = this.db.prepare("UPDATE urls SET short_url = $shortUrl, long_url = $longUrl, owner = $owner, visited_count = $visitedCount, created_at = $createdAt, updated_at = $updatedAt WHERE id = $id");
        await query.run({
            id: urlEntity.id,
            longUrl: urlEntity.longUrl,
            shortUrl: urlEntity.shortUrl,
            owner: urlEntity.owner,
            visitedCount: urlEntity.visitedCount,
            createdAt: urlEntity.createdAt.toISOString(),
            updatedAt: urlEntity.updatedAt.toISOString()
        })
    }

    public async delete(id: string): Promise<void> {
        const deleteStmt = this.db.prepare("DELETE FROM urls WHERE id = ?")
        await deleteStmt.run(id)
    }

    public async create(urlEntity: IUrlEntity): Promise<void> {
        const insert = this.db.prepare("INSERT INTO urls (id, short_url, long_url, owner, visited_count,created_at, updated_at) VALUES (?,?,?,?,?,?,?)");
        await insert.run(
            urlEntity.id,
            urlEntity.shortUrl,
            urlEntity.longUrl,
            urlEntity.owner,
            urlEntity.visitedCount,
            urlEntity.createdAt.toISOString(),
            urlEntity.updatedAt.toISOString(),
        );
    }

    public async doesShortUrlExist(shortUrl: string): Promise<boolean> {
        const query = this.db.query(
            'SELECT COUNT(*) as count FROM urls WHERE short_url = ?'
        )
        const result = await query.get(shortUrl) as { count: number }
        return result.count > 0
    }
}