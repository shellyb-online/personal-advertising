import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";



const advertSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        user: { type: String, },
        category: {
            type: String, enum: [
                "clothing and accessories",
                "Electronics and gadgets",
                "Home and living",
                "Beauty and personal care",
                "Handmade and Craft Items",
                "Toys and games",
                "Books and Stationary",
                "Sports and Outdoor",
                "Automotive",
                "Health and fitness",
                "Food and Beverages",
                "Art and collectibles",
                "Digital Product",
                "Services",],
        },
        image: { type: String, },
        date: { type: Date, default: Date.now, },
        price: { type: Number, required: true },

    },
    {
        timestamps: true,
    }
);

advertSchema.plugin(toJSON);

export const AdvertModel = model("advert", advertSchema);