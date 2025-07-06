import { IUrlEntity } from "../interfaces/domain/url.entity.interface";
import { IUrlRepository } from "../interfaces/repositories/url.repository.interface";
import { IUrlService } from "../interfaces/services/url.service.interface";

export class UrlService implements IUrlService {
    constructor(
        private urlRepository: IUrlRepository
    ) {
        this.urlRepository = urlRepository
    }

    public async createUrl(urlEntity: IUrlEntity): Promise<IUrlEntity | null> {
        await this.urlRepository.create(urlEntity)
        return this.urlRepository.findById(urlEntity.id)
    }

    public async updateLongUrl(urlEntity: IUrlEntity): Promise<IUrlEntity | null> {
        await this.urlRepository.update(urlEntity)
        return this.urlRepository.findById(urlEntity.id)
    }

    findByOwner(id: string): Promise<IUrlEntity[]> {
        return this.urlRepository.findByOwner(id)
    }

    deleteUrl(id: string): Promise<void> {
        return this.urlRepository.delete(id)
    }

    doesShortUrlExist(shortUrl: string): Promise<boolean>{
        return this.urlRepository.doesShortUrlExist(shortUrl)
    }

    findById(id: string): Promise<IUrlEntity | null> {
         return this.urlRepository.findById(id)
    }

}