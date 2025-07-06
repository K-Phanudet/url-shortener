import { IUrlEntity } from "../domain/url.entity.interface";

export interface IUrlRepository {
    findById(id:string): Promise<IUrlEntity| null>
    findByShortUrl(url: string): Promise<IUrlEntity | null>
    findByOwner(ownerId: string): Promise<IUrlEntity[]>
    update(urlEntity: IUrlEntity): Promise<void>
    delete(id: string): Promise<void>
    create(urlEntity: IUrlEntity): Promise<void>
    doesShortUrlExist(shortUrl: string): Promise<boolean>
}