import { ChangeEvent, useEffect, useState } from "react";
import "./gifts.css";
import { AudienceModel } from "../../../models/audience-model";
import { dataService } from "../../../services/data-service";
import { notify } from "../../../utils/notify";
import { GiftModel } from "../../../models/gift-model";

export function Gifts() {

    const [audience, setAudience] = useState<AudienceModel[]>([]);
    const [gifts, setGifts] = useState<GiftModel[]>([]);

    useEffect(() => {
        dataService.getAllAudience()
            .then(audience => setAudience(audience))
            .catch(err => notify.error(err));
    }, []);

    async function fetchGifts(args: ChangeEvent<HTMLSelectElement>) {
        try {
            const audienceId = +args.target.value;
            const gifts = await dataService.getGiftsByAudience(audienceId);
            setGifts(gifts);
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Gifts">

            <select defaultValue="" onChange={fetchGifts}>
                <option disabled value="">Select Audience</option>
                {audience.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Discount</th>
                    </tr>
                </thead>
                <tbody>
                    {gifts.map(g => <tr key={g.id}>
                        <td>{g.name}</td>
                        <td>{g.description}</td>
                        <td>{g.price}</td>
                        <td>{g.discount}</td>
                    </tr>)}
                </tbody>
            </table>

        </div>
    );
}
