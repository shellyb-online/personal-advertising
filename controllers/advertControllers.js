import { AdvertModel } from "../models/advertmodels.js";

// create new advert

export const addAdvert = async (req, res, next) => {
    try {
        const { error } = advertValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ status: 'error', message: error.details[0].message });
        }

        const advert = new AdvertModel(req.body);
        const savedAdvert = await advert.save();
        res.status(201).json(savedAdvert);
    } catch (error) {
        next(error);
    }

};


// Get all advert
export const getAllAdverts = async (req, res, next) => {

    try {
        const adverts = await AdvertModel.find();

        res.status(200).json(adverts);
    } catch (error) {
        next(error);
    }
};

// Fetch all advert to find the correct one based on the custom ID

export const getAdvertById = async (req, res, next) => {
    try {
        const advertId = req.params.id;
        const advert = await AdvertModel.findById(advertId);
        if (!advert) {
            return res.status(404).json('advert not found');
        }
        res.status(200).json(advert);
    } catch (error) {
        next(error);

    }

};

// Update the advert in the database using its ID
export const updateAdvert = async (req, res, next) => {
    try {
        const { error } = advertValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json("Advert updated successfully");
        }
        await AdvertModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json("Advert Updated!");
    } catch (error) {
        next(error);
    }
}
// export const updateAdvert = async (req, res, !next) => {
// try {


//     const advertId = req.params.Id;
//     const updateAdvert = await AdvertModel.findByIdAndUpdate(advertId, req.body, { new: true });
//     if (!updateAdvert) {
//         return res.status(404).json({ status: 'error', message: 'advert not found' });
//     }


//     res.status(200).json({ status: 'success', data: updateAdvert });
// } catch (error) {
//     next(error);

// }
// };



// Delete an advert
// export const deleteAdvert = async (req, res, next) => {
//     try {
//         const advertId = req.params.Id;
//         const deleteAdvert = await AdvertModel.findByIdAndDelete(advertId);
//         if (!deleteAdvert) {
//             return res.status(404).json({ status: 'error', message: 'advert not found' });
//         }
//         res.status(200).json({ status: 'success', message: 'advert deleted successfully' });
//     } catch (error) {
//         next(error);

//     }
// };

export const deleteAdvert = async (req, res, next) => {
    try {
        await AdvertModel.findByIdAndDelete(req.params.id);
        res.status(200).json("advert was deleted");
    } catch (error) {
        next(error);
    }
}