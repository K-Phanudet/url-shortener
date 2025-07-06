import { Url } from "../domain/entities/url.entity";
import { CreateUrlDetailsDto } from "../dtos/url.dtos";
import { IUrlService } from "../interfaces/services/url.service.interface";
import { v4 as uuid } from "uuid"

export class CreateUrlUseCase {

    private alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    private shortCodeLength = 8

    constructor(
        private urlService: IUrlService
    ) { }

    async execute(details: CreateUrlDetailsDto): Promise<void> {

        try {
            let uniqKey = false
            let shortUrl = ""
            while (!uniqKey) {
                shortUrl = this.generateShortUrl()
                uniqKey = !(await this.urlService.doesShortUrlExist(shortUrl))
            }

            const url = new Url(
                uuid(),
                shortUrl,
                details.longUrl,
                details.owner,
                0,
                new Date(),
                new Date()
            )
            await this.urlService.createUrl(url)
        } catch (error) {
            console.log("[CreateUrlUseCase] error: ", error)
            throw error
        }
    }

    public generateShortUrl(): string {
        let result = '';
        for (let i = 0; i < this.shortCodeLength; i++) {
            result += this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length));
        }
        return result;
    }
}