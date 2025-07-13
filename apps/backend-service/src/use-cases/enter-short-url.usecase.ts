import { IUrlService } from "../interfaces/services/url.service.interface";

export class EnterShortUrlUseCase {
    constructor (
        private urlService: IUrlService
    ){}

    async execute(shortUrl: string): Promise<string> {
        try {
            const urlEntity = await  this.urlService.getLongUrlByShortUrl(shortUrl)
            urlEntity.visit()
            await this.urlService.update(urlEntity)
            return urlEntity.longUrl
        }catch(error){
            throw error
        }
    }
}