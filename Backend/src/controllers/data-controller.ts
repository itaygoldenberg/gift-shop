import express, { Request, Response, Router } from "express";
import { dataService } from "../services/data-service";
import { GiftModel } from "../models/gift-model";
import { StatusCode } from "../models/enums";

// Contains routes, without logic.
class DataController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {
        this.router.get("/api/audience", this.getAllAudience);
        this.router.get("/api/gifts-by-audience/:audienceId", this.getGiftsByAudience);
        this.router.post("/api/gifts", this.addGift);
    }

    private async getAllAudience(request: Request, response: Response): Promise<void> {
        const audience = await dataService.getAllAudience();
        response.json(audience);
    }

    private async getGiftsByAudience(request: Request, response: Response): Promise<void> {
        const audienceId = +request.params.audienceId;
        const gifts = await dataService.getGiftsByAudience(audienceId);
        response.json(gifts);
    }

    private async addGift(request: Request, response: Response): Promise<void> {
        const gift = new GiftModel(request.body);
        const dbGift = await dataService.addGift(gift);
        response.status(StatusCode.Created).json(dbGift);
    }

}

export const dataController = new DataController();
