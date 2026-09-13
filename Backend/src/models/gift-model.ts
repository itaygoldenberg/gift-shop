import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Gift Schema:
const GiftSchema = z.object({
    id: z.number().int().positive().optional(),
    audienceId: z.number().int().positive(),
    name: z.string().min(2).max(100),
    description: z.string().min(10).max(5000),
    price: z.number().min(0).max(10000),
    discount: z.number().int().min(0).max(100).optional()
});

// Gift Interface (I = Interface):
type IGiftModel = z.infer<typeof GiftSchema>;

// Gift Model:
export class GiftModel implements IGiftModel {

    public id: number;
    public audienceId: number;
    public name: string;
    public description: string;
    public price: number;
    public discount: number;

    public constructor(gift: GiftModel) { // Copy Constructor
        this.id = gift.id;
        this.audienceId = +gift.audienceId;
        this.name = gift.name;
        this.description = gift.description;
        this.price = +gift.price;
        this.discount = +gift.discount;
    }

    public validate(): void {
        const result = GiftSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
    
}
