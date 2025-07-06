export interface IUrlEntity {
    id: string
    shortUrl: string
    longUrl: string
    owner: string
    visitedCount: number
    createdAt: Date
    updatedAt: Date
    updateLongUrl(url: string, updatedAt: Date): void
    visit(): void
}