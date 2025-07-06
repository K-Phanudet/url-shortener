import { IUrlEntity } from "../../interfaces/domain/url.entity.interface"

export class Url implements IUrlEntity {
    constructor(
        public id: string,
        public shortUrl: string,
        public longUrl: string,
        public owner: string,
        public visitedCount: number,
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) {
        this.id = id
        this.shortUrl = shortUrl
        this.longUrl = longUrl
        this.owner = owner
        this.visitedCount = visitedCount
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }

    updateLongUrl(url: string, updatedAt: Date): void {
        this.longUrl = url
        this.updatedAt = updatedAt
    }

    visit(): void {
        this.visitedCount += 1
    }
}