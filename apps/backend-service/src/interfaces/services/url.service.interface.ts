import { IUrlEntity } from "../domain/url.entity.interface";

export interface IUrlService {
    createUrl(urlEntity: IUrlEntity): Promise<IUrlEntity | null>
    updateLongUrl(urlEntity: IUrlEntity): Promise<IUrlEntity | null>
    findByOwner(id: string): Promise<IUrlEntity[]>
    findById(id: string): Promise<IUrlEntity | null>
    doesShortUrlExist(shortUrl: string): Promise<boolean>
    deleteUrl(id: string): Promise<void>
}
