import { URLResponseDto } from "../dtos/url.dtos";
import { IUrlService } from "../interfaces/services/url.service.interface";

export class FetchUrlListUsecase {
    constructor(private urlService: IUrlService){}

    async execute(owner: string): Promise<URLResponseDto[]> {
        return this.urlService.findByOwner(owner)
    }
}