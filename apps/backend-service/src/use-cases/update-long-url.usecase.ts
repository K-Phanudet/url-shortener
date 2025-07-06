import { UpdateLongUrlDetailsDto, URLResponseDto } from "../dtos/url.dtos"
import { IUrlService } from "../interfaces/services/url.service.interface"

export class UpdateLongUrlUseCase {
    constructor(
        private urlService: IUrlService
    ){}

    async execute(details: UpdateLongUrlDetailsDto): Promise<URLResponseDto>{
        const urlEntity = await this.urlService.findById(details.id)
        if(!urlEntity){
            throw new Error("[UpdateLongUrlUseCase] error: Resource not found")
        }
        urlEntity.updateLongUrl(details.longUrl, new Date())
        const updatedEntity = await this.urlService.updateLongUrl(urlEntity)
        
        if(!updatedEntity){
            throw new Error("[UpdateLongUrlUseCase] error: Something went wrong")
        }
        return {
            id: updatedEntity.id,
            longUrl: updatedEntity.longUrl,
            shortUrl: updatedEntity.shortUrl,
            owner: updatedEntity.owner,
            visitedCount: updatedEntity.visitedCount,
            createdAt: updatedEntity.createdAt,
            updatedAt: updatedEntity.updatedAt,
        }
    }
}