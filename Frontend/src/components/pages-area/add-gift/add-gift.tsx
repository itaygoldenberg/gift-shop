import { useForm } from "react-hook-form";
import "./add-gift.css";
import { GiftModel } from "../../../models/gift-model";
import { useEffect, useState } from "react";
import { AudienceModel } from "../../../models/audience-model";
import { dataService } from "../../../services/data-service";
import { notify } from "../../../utils/notify";
import { useNavigate } from "react-router-dom";

export function AddGift() {

    const [audience, setAudience] = useState<AudienceModel[]>([]);
    const { register, handleSubmit } = useForm<GiftModel>();
    const navigate = useNavigate();

    useEffect(() => {
        dataService.getAllAudience()
            .then(audience => setAudience(audience))
            .catch(err => notify.error(err));
    }, []);

    async function send(gift: GiftModel) {
        try {
            await dataService.addGift(gift);
            notify.success("Gift has been added.");
            navigate("/gifts");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="AddGift">

            <form onSubmit={handleSubmit(send)}>

                <label>Target Audience: </label>
                <select defaultValue="" {...register("audienceId")} required>
                    <option disabled value="">Select Audience</option>
                    {audience.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>

                <label>Name</label>
                <input type="text" {...register("name")} required minLength={2} maxLength={100} />

                <label>Description</label>
                <textarea {...register("description")} required minLength={10} maxLength={5000}></textarea>

                <label>Price</label>
                <input type="number" {...register("price")} required min={0} max={10000} step="0.01" />

                <label>Discount</label>
                <input type="number" {...register("discount")} required min={0} max={100} />

                <button>Add</button>

            </form>

        </div>
    );
}
