import { OkPacketParams } from "mysql2";
import { AudienceModel } from "../models/audience-model";
import { GiftModel } from "../models/gift-model";
import { dal } from "../utils/dal";

// Logic:
class DataService {

    public async getAllAudience(): Promise<AudienceModel[]> {
        const sql = "select * from audience";
        const audience = await dal.execute(sql) as AudienceModel[];
        return audience;
    }

    public async getGiftsByAudience(audienceId: number): Promise<GiftModel[]> {
        const sql = "select * from gifts where audienceId = ?";
        const values = [audienceId];
        const gifts = await dal.execute(sql, values) as GiftModel[];
        return gifts;
    }

    public async addGift(gift: GiftModel): Promise<GiftModel> {
        gift.validate();
        const sql = "insert into gifts(audienceId, name, description, price, discount) values(?,?,?,?,?)";
        const values = [gift.audienceId, gift.name, gift.description, gift.price, gift.discount];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        gift.id = info.insertId!;
        return gift;
    }

}

export const dataService = new DataService();
