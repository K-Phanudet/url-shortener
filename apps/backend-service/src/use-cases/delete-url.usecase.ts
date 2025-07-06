import { IUrlService } from "../interfaces/services/url.service.interface";

export class DeleteUrlUsecase {
    constructor(private urlService: IUrlService){}

    async execute(id: string): Promise<void> {
        return this.urlService.deleteUrl(id)
    }
}