import { URLResponseDto } from "../dtos/url.dtos";
import { IUrlService } from "../interfaces/services/url.service.interface";

export class GetUrlByIdUsecase {
    constructor(private urlService: IUrlService) { }

    async execute(id: string): Promise<URLResponseDto> {
        const urlEntity = await this.urlService.findById(id)
        if (!urlEntity) {
            throw new Error("Resource Not Found")
        }
        return {
            id: urlEntity.id,
            longUrl: urlEntity.longUrl,
            shortUrl: urlEntity.shortUrl,
            owner: urlEntity.owner,
            visitedCount: urlEntity.visitedCount,
            createdAt: urlEntity.createdAt,
            updatedAt: urlEntity.updatedAt,
        }
    }
}