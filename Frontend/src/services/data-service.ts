import axios from "axios";
import { AudienceModel } from "../models/audience-model";
import { appConfig } from "../utils/app-config";
import { GiftModel } from "../models/gift-model";

class DataService {

    public async getAllAudience(): Promise<AudienceModel[]> {
        const response = await axios.get<AudienceModel[]>(appConfig.audienceUrl);
        const audience = response.data;
        return audience;
    }

    public async getGiftsByAudience(audienceId: number): Promise<GiftModel[]> {
        const response = await axios.get<GiftModel[]>(appConfig.giftsByAudienceUrl + "/" + audienceId);
        const gifts = response.data;
        return gifts;
    }

    public async addGift(gift: GiftModel): Promise<void> {
        const response = await axios.post<GiftModel>(appConfig.giftsUrl, gift);
        const dbGift = response.data;
        console.log(dbGift);        
    }

}

export const dataService = new DataService();
