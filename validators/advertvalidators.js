import Joi from "joi";

export const addAdvertValidators = Joi.object({
    title: Joi.String().required(),
    description: Joi.String().required(),
    user: Joi.String().required(),
    category: Joi.String().valid(
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
        "Services").required(),
    img: Joi.String().optional(),
    price: Joi.number().required()
});