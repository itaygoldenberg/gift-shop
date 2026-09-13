import z from "zod";
import { ClientError } from "./client-error";
import { StatusCode } from "./enums";

// Audience Schema:
const AudienceSchema = z.object({
    id: z.number().int().positive().optional(),
    name: z.string().min(2).max(50)
});

// Audience Interface (I = Interface):
type IAudienceModel = z.infer<typeof AudienceSchema>;

// Audience Model:
export class AudienceModel implements IAudienceModel {

    public id: number;
    public name: string;

    public constructor(audience: AudienceModel) { // Copy Constructor
        this.id = audience.id;
        this.name = audience.name;
    }

    public validate(): void {
        const result = AudienceSchema.safeParse(this);
        if (!result.success) {
            const message = result.error.issues[0].path + ": " + result.error.issues[0].message;
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }
    
}
